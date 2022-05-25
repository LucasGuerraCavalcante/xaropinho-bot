const {
	checkIfHasPermissions,
	handleAudioCommand,
	handleNoPermissions,
	handleNoVoiceChannel,
} = require('./methods/index.js');

module.exports = {
	async handleOnAudioCommandReceived(receivedMessage, messageContent, serverQueue) {
		const voiceChannel = receivedMessage.member.voice.channel;

		if(voiceChannel) {
			const permissions = voiceChannel.permissionsFor(receivedMessage.guild.me);

			if(checkIfHasPermissions(permissions)) {
				handleAudioCommand(receivedMessage, messageContent, serverQueue, voiceChannel);
			}
			else {
				handleNoPermissions(receivedMessage);
			}
		}
		else {
			handleNoVoiceChannel(receivedMessage);
		}
	},
};
