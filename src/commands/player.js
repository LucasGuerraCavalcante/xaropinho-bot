
const rootFunctions = require('./root')

const { prefix, eyeEmoji } = require('../utils/config.json');
const { commandsArray, commandsData } = require('../data/commands.js')

// const ajuda = require('../data/ajuda.js')

const queue = new Map();

// ------------------------------------------------------------------------------------

module.exports = { 

  async soundEffectsPlayer(receivedMessage) {

    if (receivedMessage.author.bot) return;

    if (!receivedMessage.content.startsWith(prefix)) return;

    const serverQueue = queue.get(receivedMessage.guild.id);

    const receivedContentString = receivedMessage.content;

    if (receivedContentString.startsWith(`${prefix}ajuda`)) {
        const ajudaEmbed = new MessageEmbed()
          .setTitle('Ajuda Aqui!!!')
          .setColor(0x0000FF)
          .setDescription('Confira os links e resolva todos seus problemas!')
          .addField('Comandos/Documentação: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot/blob/main/README.md')
          .addField('Link para adicionar o bot: ', 'https://discord.com/oauth2/authorize?client_id=801642174093590538&permissions=3665472&scope=bot')
          .addField('Repositório GitHub: ', 'https://github.com/LucasGuerraCavalcante/xaropinho-bot')
          .addField('Dúvidas? Sugestões? Bugs?: ', 'lucasguerratee@gmail.com');

          receivedMessage.reply(ajudaEmbed);
        // receivedMessage.reply(ajuda);
      return;
    }

    if (commandsArray.includes(receivedContentString)) {

      commandIndex = commandsArray.indexOf(receivedContentString);

      receivedMessage.reply(eyeEmoji);

      rootFunctions.execute(
        receivedMessage, 
        serverQueue, 
        commandsData[commandIndex].message, 
        commandsData[commandIndex].url
      );
      return;
    } 
    else {
        receivedMessage.reply("Nheeeee.... Comando inválido!");
        receivedMessage.reply("Digite >ajuda para mais informaçãoes!");
    }
  }
}
