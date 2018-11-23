

exports.run = async (client, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(kUser) return message.channel.send("Sorry, couldn't find the user");
    let kReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do  not have the permission to kick Members");
    if(kUser.hasPermission("ADMINSTRATOR")) return message.channel.send("Sorry you cannot kick an Adminstator")

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("RANDOM")
    .addField("Kicked user", `${kUser.id}`)
    .addField("Kick by", `<@${message,author.id}>`)
    .addField("Reason", `${kReason}`);

    let kickChannel = message.guild.channels.find(`name`, "logs")
    if(!kickChannel) return message.channel.send("Can't find the channel called logs")
    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed)


    return;
}
module.exports.help = {
    name: "kick"
  }