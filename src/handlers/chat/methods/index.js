const Discord = require('discord.js');

const { prefix } = require('../../../commands/config/config.json');
const { commandsArray } = require('../../../commands/audios.js');

function checkAuthorIsNotBot(receivedMessage) {
	return !receivedMessage.author.bot;
}

function checkMessageStartsWithPrefix(receivedMessage) {
	return receivedMessage.content.startsWith(prefix);
}

function checkMessageIsValid(receivedMessage) {
	return checkAuthorIsNotBot(receivedMessage) && checkMessageStartsWithPrefix(receivedMessage);
}

function checkCommandIsValid(messageContent) {
	return commandsArray.includes(messageContent);
}

function checkIfHelpCommand(messageContent) {
	return messageContent.startsWith(commandsArray[0]);
}

function handleHelpCommand(receivedMessage) {
	const ajudaEmbed = new Discord.MessageEmbed()
		.setTitle('Ajuda Aqui!!!')
		.setColor('#0099ff')
		.setDescription('Confira os links e resolva todos seus problemas!')
		.addField('Comandos/Documentação: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot/blob/main/README.md')
		.addField('Link para adicionar o bot: ', 'https://discord.com/oauth2/authorize?client_id=801642174093590538&permissions=3665472&scope=bot')
		.addField('Repositório GitHub: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot')
		.addField('Dúvidas? Sugestões? Bugs?: ', 'suportexaropinho@gmail.com')
		.setTimestamp()
		.setFooter('Obrigado por utilizar Xaropinho Bot');

	receivedMessage.channel.send(ajudaEmbed);
}

function handleInvalidCommand(receivedMessage) {
	receivedMessage.reply('Uêpa!!! Comando inválido!');
	receivedMessage.reply('>ajuda para mais informaçãoes!');
}

module.exports = {
	checkMessageIsValid,
	checkCommandIsValid,
	checkIfHelpCommand,
	handleHelpCommand,
	handleInvalidCommand,
};
