
// Detector de mensagens do chat / funcao principal da aplicacao

const { prefix, eyeEmoji } = require('../utils/config.json');
const { commandsArray, commandsData } = require('../commands/commands.js');

const rootFunctions = require('./root');
const ajudaEmbed = require('../commands/ajuda.js');

const queue = new Map();

// ------------------------------------------------------------------------------------

module.exports = { 

  async soundEffectsPlayer(receivedMessage) {

    if (receivedMessage.author.bot) return;

    if (!receivedMessage.content.startsWith(prefix)) return;

    const serverQueue = queue.get(receivedMessage.guild.id);

    const receivedContentString = receivedMessage.content;

    if (receivedContentString.startsWith(`${prefix}ajuda`)) {
      receivedMessage.channel.send(ajudaEmbed);
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
