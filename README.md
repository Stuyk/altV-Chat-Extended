# extended:Chat for alt:V

Remember to 🌟 this Github if you 💖 it.

You can start by adding the chat resource in its own folder called 'chat'.

This chat resource builds on the EXISTING chat resource for alt:V.

**Features:**

* Register Commands
* Send Chat Messages
* Broadcast Chat Messages
* Cancel Default Chat Behavior and Relay to New Event
* Mute Players
* Chat Ranges (Must be enabled inside the index.mjs for chat.);
* Chat Open / Close Events for Clientside
* Chat Message Event for Clientside
* Automatically Clear Chat Box on Close
* Chat Padding Removed for Double the Messages Viewable
* Chat Visibility Fix
* Debug Chat Formatting

**Chat Range**

![](https://i.imgur.com/uu74ct0.png)

![](https://i.imgur.com/SKwdYfu.png)


**Debug Formatting**

![](https://i.imgur.com/BOMn4eH.png)


**Installation:**

```yaml
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

`resource.cfg`
```yaml
type: js,
main: your_resource_main.mjs
client-main: your_resource_client.mjs
client-files: [],
deps: [
    chat
]
```

### Configuration
Inside chat/index.mjs:
```js
let rangedChat = false; // Used for ranged chat.
let rangeOfChat = 25; // Used for ranged chat.
let cancelAllChat = false; // Used to intercept messages.
```

### General Usage
**Serverside**
```js
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
chat.unmute(player);

alt.on('chatIntercept', (player, msg) => {
    // Do whatever you need to do.
});

// Debug formatting.
chat.success(`Something succeeded!`);
chat.info(`INFORMATION!`);
chat.warning(`Don't do it, man!`);
chat.error(`Now you screwed it up! Good Job!`);
chat.debug(`secret INFORMATION!`);
```

**Clientside**
```js
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


