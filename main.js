
const Discord = require('discord.js');

require('dotenv').config();

const commands = require('./src/commands/player')

// const AUD_BOT_TOKEN = require('./utils/keys')
// bot_token = AUD_BOT_TOKEN

const bot_token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.login(bot_token)

// -------------------------------------------------------------------------------------------------

client.on('message', recivedMessage => commands.soundEffectsPlayer(recivedMessage))