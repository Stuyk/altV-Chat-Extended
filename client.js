import * as alt from 'alt';
import * as game from 'natives';

let buffer = [];

let loaded = false;
let opened = false;
let hidden = false;

let view = new alt.WebView('http://resource/html/index.html');

function addMessage(name, text) {
	if (name) {
		view.emit('addMessage', name, text);
	} else {
		view.emit('addString', text);
	}
}

view.on('chatloaded', () => {
	for (const msg of buffer) {
		addMessage(msg.name, msg.text);
	}

	loaded = true;
});

view.on('chatmessage', (text) => {
	alt.emitServer('chatmessage', text);
  
	if (text !== undefined && text.length >= 1)
		alt.emit('messageSent', text);

	opened = false;
	alt.emit('chatClosed');
	alt.toggleGameControls(true);
});

export function pushMessage(name, text) {
	if (!loaded) {
		buffer.push({ name, text });
	} else {
		addMessage(name, text);
	}
}

export function pushLine(text) {
	pushMessage(null, text);
}

export function isChatHidden() {
	return hidden;
}

export function isChatOpen() {
	return opened;
}

alt.onServer('chatmessage', pushMessage);

alt.on('keyup', (key) => {
	if (!loaded)
		return;

	if (!opened && key === 0x54 && alt.gameControlsEnabled()) {
		opened = true;
		view.emit('openChat', false);
		alt.emit('chatOpened');
		alt.toggleGameControls(false);
	}
	else if (!opened && key === 0xBF && alt.gameControlsEnabled()) {
		opened = true;
		view.emit('openChat', true);
		alt.emit('chatOpened');
		alt.toggleGameControls(false);
	}
	else if (opened && key == 0x1B) {
		opened = false;
		view.emit('closeChat');
		alt.emit('chatClosed');
		alt.toggleGameControls(true);
	}

	if (key == 0x76) {
		hidden = !hidden;
		game.displayHud(!hidden);
		game.displayRadar(!hidden);
		view.emit('hideChat', hidden);
	}
});

export default { pushMessage, pushLine, isChatHidden, isChatOpen };
