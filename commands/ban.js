
exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(bUser) return message.channel.send("Sorry, couldn't find the user");
    let bReason = args.join(" ").slice(22)
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do  not have the permission to ban Members");
    if(bUser.hasPermission("ADMINSTRATOR")) return message.channel.send("Sorry you cannot ban an Adminstator")

    let BanEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("RANDOM")
    .addField("Banned user", `${bUser.id}`)
    .addField("Banned by", `<@${message,author.id}>`)
    .addField("Reason", `${bReason}`);

    let banChannel = message.guild.channels.find(`name`, "logs")
    if(!banChannel) return message.channel.send("Can't find the channel called logs")
    message.guild.member(bUser).ban(bReason);
    BanChannel.send(BanEmbed)


    return;
}
module.exports.help = {
    name: "ban"
  }