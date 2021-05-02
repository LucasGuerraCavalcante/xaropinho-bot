// Funcoes que fazem a base a funcao princial / Fazem os audios tocarem

const ytdl = require('ytdl-core');

const queue = new Map();

// ------------------------------------------------------------------------------------

async function play(guild, audio) {
	const serverQueue = queue.get(guild.id);
	if (!audio) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = await serverQueue.connection
		.play(ytdl(audio.url))
		.on('finish', () => {
			serverQueue.textChannel.send(`**${audio.title}**`);
			serverQueue.audios.shift();
			play(guild, serverQueue.audios[0]);
		})
		.on('error', error => console.error(error));

	dispatcher.setVolumeLogarithmic(serverQueue.volume / 8);
}

// ------------------------------------------------------------------------------------

// Root Function (palys audio)

module.exports = {
	async execute(receivedMessage, serverQueue, titulo, url) {

		const voiceChannel = receivedMessage.member.voice.channel;
		if (!voiceChannel) return receivedMessage.reply('Ei, você precisa estar conectado a um canal de voz me utilizar!');

		const permissions = voiceChannel.permissionsFor(receivedMessage.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return receivedMessage.reply('Ei, eu preciso de permissão para me conectar e falar em algum canal de voz!');

		const audioInfo = await ytdl.getInfo(url);

		const audio = {
			title: titulo,
			url: audioInfo.videoDetails.video_url,
		};

		if (!serverQueue) {
			const queueContruct = {
				textChannel: receivedMessage.channel,
				voiceChannel: voiceChannel,
				connection: null,
				audios: [],
				volume: 8,
				playing: true,
			};

			queue.set(receivedMessage.guild.id, queueContruct);

			queueContruct.audios.push(audio);

			try {
				const connection = await voiceChannel.join();
				queueContruct.connection = connection;
				play(receivedMessage.guild, queueContruct.audios[0]);
			}
			catch (err) {
				console.log(err);
				queue.delete(receivedMessage.guild.id);
				return receivedMessage.channel.send(err);
			}
		}
		else {
			serverQueue.audios.push(audio);
			return;
		}
	},
};
