
const rootFunctions = require('./root')

const { prefix, eyeEmoji } = require('../utils/config.json');
const { commandsArray, commandsData } = require('../data/commands.js')

const ajuda = require('../data/ajuda.js')

const queue = new Map();

// ------------------------------------------------------------------------------------

module.exports = { 

  async soundEffectsPlayer(receivedMessage) {

    if (receivedMessage.author.bot) return;

    if (!receivedMessage.content.startsWith(prefix)) return;

    const serverQueue = queue.get(receivedMessage.guild.id);

    const receivedContentString = receivedMessage.content;

    if (receivedContentString.startsWith(`${prefix}ajuda`)) {
      receivedMessage.reply(ajuda);
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
    }
  }
}
