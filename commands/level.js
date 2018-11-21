const Discord = require("discord.js");
let xp = require("../xp.json");

exports.run = async (client, message, args) => {

    if(!xp[message.author.username]){
      xp[message.author.username] = {
          xp: 0,
          level: 1
      };
    }
 
  let curxp = xp[message.author.username].xp;
  let curlvl = xp[message.author.username].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#f2a92b")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
    name: "level"
  }