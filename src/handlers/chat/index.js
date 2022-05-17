const {
	checkMessageIsValid,
	checkCommandIsValid,
	checkIfHelpCommand,
	handleHelpCommand,
	handleInvalidCommand,
} = require('./methods/index.js');

const { eyeEmoji } = require('../../commands/config/config.json');

const { handleOnAudioCommandReceived } = require('../audio/index.js');

const queue = new Map();

module.exports = {
	async handleOnMessageReceived(receivedMessage) {
		if(checkMessageIsValid(receivedMessage)) {
			const serverQueue = queue.get(receivedMessage.guild.id);
			const messageContent = receivedMessage.content;

			if (checkCommandIsValid(messageContent)) {
				if (checkIfHelpCommand(messageContent)) {
					handleHelpCommand(receivedMessage);
				}
				else {
					receivedMessage.reply(eyeEmoji);

					handleOnAudioCommandReceived(
						receivedMessage,
						messageContent,
						serverQueue,
					);
				}
			}
			else {
				handleInvalidCommand(receivedMessage);
			}
		}
	},
};
