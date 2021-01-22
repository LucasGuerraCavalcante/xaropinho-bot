
const Discord = require('discord.js');

require('dotenv').config();

const commands = require('./src/commands/player');

const bot_token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

// -------------------------------------------------------------------------------------------------

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

client.on('message', recivedMessage => commands.soundEffectsPlayer(recivedMessage))

// -------------------------------------------------------------------------------------------------

// Tive que fazer isso por conta de um erro no Heroku.
// Nao consegui achar melhor solucao para isso no momento.
// Erro em questao: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch.

// const express = require('express');

// const app = express();
// const port = 5001;

// app.get('/', async (req, res) => {
//     res.send('https://github.com/LucasGuerraCavalcante/xaropinho-bot/blob/main/README.md')
// });

// app.listen(port, () => console.log(`App listening on port ${port}!`));

// -------------------------------------------------------------------------------------------------