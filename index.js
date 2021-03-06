const prefix = "!";
const Discord = require("discord.js")
const fs = require("fs");
const db = require(`quick.db`);
const bot = new Discord.Client({disableEveryone: true});
let xp = require("./xp.json");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} has been loaded`);
        bot.commands.set(props.help.name, props);
    });
});
bot.on("ready", async() => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("Leveling up LOL")
})

bot.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix
    let messageArray = message.content.split(".")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd == `${prefix}serverinfo`){

        let serverembed = new Discord.RichEmbed()
        .setAuthor("Server Info")
        .setColor("GOLD")
        .addField("Server Name", message.guild.name)
        .addField("You joined in", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverembed)
    }
    if(cmd == `${prefix}ban`){
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
    if(cmd == `${prefix}kick`){
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
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd)

    if(!xp[message.author.username]){
        xp[message.author.username] = {
            xp: 0,
            level: 1
        };
    }
    let curxp = xp[message.author.username].xp;
    let curlvl = xp[message.author.username].level;
    let nxtLvl = xp[message.author.username].level * 300;
    let user = message.author.toString()
    let VIPr = message.guild.roles.find(r => r.name === "VIP");
    let VIP2r = message.guild.roles.find(r => r.name === "VIP+");
    let MVPr = message.guild.roles.find(r => r.name === "MVP");
    let MVP2r = message.guild.roles.find(r => r.name === "MVP+");
    xp[message.author.username].xp = curxp + xpAdd;
    if(nxtLvl <= xp[message.author.username].xp){
        xp[message.author.username].level = curlvl + 1;
        bot.channels.get("513101219389112333").send(`GG ${user}, you just advanced to level ${xp[message.author.username].level}!`);
    }
    let VIP = xp[message.author.username].level * 2100;
    let VIP2 = xp[message.author.username].level * 4800;
    let MVP = xp[message.author.username].level * 7200;
    let MVP2 = xp[message.author.username].level * 9600;
    if(VIP2 <= xp[message.author.username].xp){
        xp[message.author.username].level = 8;
        message.member.addRole (VIPr);

        message.channel.send("Congratz you have been awarded the Rank VIP For reaching level 16");
    }
    if(VIP <= xp[message.author.username].xp){
        xp[message.author.username].level = 16;
        message.member.addRole (VIP2r);

        message.channel.send("Congratz you have been awarded the role VIP+ For reaching level 24");
    }
    if(MVP <= xp[message.author.username].xp){
        xp[message.author.username].level = 24;
        message.member.addRole (MVPr);

        message.channel.send("Congratz you have been awarded the level MVP For reaching level 32");
    }
    if(MVP2 <= xp[message.author.username].xp){
        xp[message.author.username].level = 32;
        message.member.addRole (MVP2r);

        message.channel.send("Congratz you have been awarded the level MVP+ For reaching level 32");
    }
    fs.writeFile("./xp.json", JSON.stringify(xp),(err) => {
        if(err) console.log(err)
    });
    console.log(`${message.author.username} earned ${xpAdd} XP`);

    

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
});
bot.login(process.env.BOT_TOKEN)
