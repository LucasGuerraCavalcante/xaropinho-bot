
const Discord = require('discord.js');

// Objeto de mensagem de ajuda "embed"

const ajudaEmbed = new Discord.MessageEmbed()
    .setTitle('Ajuda Aqui!!!')
    .setColor('#0099ff')
    .setDescription('Confira os links e resolva todos seus problemas!')
    .addField('Comandos/Documentação: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot/blob/main/README.md')
    .addField('Link para adicionar o bot: ', 'https://discord.com/oauth2/authorize?client_id=801642174093590538&permissions=3665472&scope=bot')
    .addField('Repositório GitHub: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot')
    .addField('Dúvidas? Sugestões? Bugs?: ', 'lucasguerratee@gmail.com')
    .setTimestamp()
    .setFooter('Obrigado por utilizar Xaropinho Bot');

module.exports = ajudaEmbed;
