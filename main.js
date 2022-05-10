const Discord = require('discord.js');

require('dotenv').config();

const { handleOnMessageReceived } = require('./src/handlers/chat/index.js');
const bot_token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.once('ready', () => {
	console.log(`Connected as ${client.user.tag}`);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.login(bot_token);

client.on('message', receivedMessage => handleOnMessageReceived(receivedMessage));
