# extended:Chat for alt:V

You can start by adding the chat resource in its own folder called 'chat'.
Features:

* Register Commands
* Send Chat Messages
* Broadcast Chat Messages
* Cancel Default Chat Behavior and Relay to New Event
* Mute Players
* Chat Ranges (Must be enabled inside the index.mjs for chat.);
* Chat Open / Close Events for Clientside
* Chat Message Event for Clientside

**Chat Range**
![](https://i.imgur.com/uu74ct0.png)

**If you plan on using chat ranges please consider that [this is 100 range for two players](https://i.imgur.com/agmEMtY.jpg)**

```
altVServerFolder/
└── resources/
    ├── chat/
    |   ├── index.mjs
    |   ├── client.mjs
    |   ├── resource.cfg
    |   └── html/
    └── your_resource/
        ├── your_resource_main.mjs
        ├── your_resource_client.mjs
        └── your_resource.cfg
```

**This is for YOUR resource that you want to implement the chat resource into.**
resource.cfg
```
type: js,
main: your_resource_main.mjs
client-main: your_resource_client.mjs
client-files: [],
deps: [
    chat
]
```

### General Usage
**Serverside**
```
import * as alt from 'alt';
import * as chat from 'chat';

// Registers player based functions.
// ie.
// player.sendMessage('Hello!');
// player.mute(true);
alt.on('playerConnect', (player) => {
    chat.setupPlayer(player);
});

// Uses the chat resource to register a command.
// Sends a chat message to the player with their position information.
chat.registerCmd('pos', (player, args) => {
    // Send a message to a player.
    chat.send(player, `X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
    
    // Send a message to a player directly.
    player.sendMessage(`X: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
    
    // Mute a player.
    player.mute(true);

    // Unmute a player.
    player.mute(false);
    
    // Sends to all players.
    chat.broadcast(`${player.name} is located at: ${player.pos.x}, Y: ${player.pos.y}, Z: ${player.pos.z}`);
});

chat.mute(player);
chat.unmute(player)

alt.on('chatIntercept', (player, msg) => {
    // Do whatever you need to do.
});
```

**Clientside**
```
import * as alt from 'alt';
import * as chat from 'chat';

// This event fires when the chat is opened.
alt.on('chatOpened', () => {
    alt.log('Chat was opened!');
});

// This event fires when the chat is closed.
alt.on('chatClosed', () => {
    alt.log('Chat was closed!');
});

// This event is fired when the player presses enter or the chat message is longer than 1.
alt.on('messageSent', (msg) => {
    alt.log(msg);
});

chat.pushMessage('tacoGuy', 'hello');
chat.pushLine('hello there!');

var chatHiddenStatus = chat.isChatHidden();
var chatOpenStatus = chat.isChatOpen();
```


