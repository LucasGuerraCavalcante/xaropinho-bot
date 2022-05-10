const ytdl = require('ytdl-core');
const queue = new Map();

const { commandsArray, commandsData } = require('../../../commands/audios.js');

function checkIfHasPermissions(permissions) {
	return !permissions.has('CONNECT') || !permissions.has('SPEAK');
}

async function handleAudioCommand(receivedMessage, messageContent, serverQueue, voiceChannel) {
	const audioData = await getAudioData(messageContent);

	if (!serverQueue) {
		const guildId = receivedMessage.guild.id;
		const textChannel = receivedMessage.channel;

		const newServerQueue = createServerQueue(textChannel, voiceChannel);

		queue.set(guildId, newServerQueue);

		addAudioToQueue(serverQueue, audioData);

		try {
			const connection = await voiceChannel.join();
			newServerQueue.connection = connection;

			playAudio(guildId, newServerQueue.audios[0]);
		}
		catch (err) {
			handlePlayAudioError(err, textChannel);
		}
	}
	else {
		addAudioToQueue(serverQueue, audioData);
	}
}

async function getAudioData(messageContent) {
	const commandIndex = commandsArray.indexOf(messageContent);
	const audioInfo = await ytdl.getInfo(commandsData[commandIndex].url);

	return {
		title: commandsData[commandIndex].message,
		url: audioInfo.videoDetails.video_url,
	};
}

function createServerQueue(textChannel, voiceChannel) {
	return {
		textChannel: textChannel,
		voiceChannel: voiceChannel,
		connection: null,
		audios: [],
		volume: 8,
		playing: true,
	};
}

function addAudioToQueue(queueConstruct, audioData) {
	queueConstruct.audios.push(audioData);
}

function handlePlayAudioError(err, textChannel, guildId) {
	textChannel.send('Ocorreu um erro ao tocar o áudio!: ', err);
	queue.delete(guildId);
}

async function playAudio(guild, audio) {
	const serverQueue = queue.get(guild);

	if (!audio) {
		leaveVoiceChannel(guild, serverQueue);
	}

	else {
		const dispatcher = await serverQueue.connection
			.play(ytdl(audio.url))
			.on('finish', () => {
				serverQueue.textChannel.send(`**${audio.title}**`);
				serverQueue.audios.shift();

				playAudio(guild, serverQueue.audios[0]);
			})
			.on('error', error => console.error(error));

		dispatcher.setVolumeLogarithmic(serverQueue.volume / 8);
	}
}

function leaveVoiceChannel(guild, serverQueue) {
	serverQueue.voiceChannel.leave();
	queue.delete(guild);
}

function	handleNoPermissions(receivedMessage) {
	receivedMessage.reply('Ei, eu preciso de permissão para me conectar e falar em algum canal de voz!');
}

function	handleNoVoiceChannel(receivedMessage) {
	receivedMessage.reply('Ei, você precisa estar conectado a um canal de voz me utilizar!');
}

module.exports = {
	checkIfHasPermissions,
	handleAudioCommand,
	handleNoPermissions,
	handleNoVoiceChannel,
};
