const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports={
    name: "salary",
    description: "sets the daily salary for a user",
    execute(message, args){
        let profile=message.mentions.members.first()

        if(!message.member.roles.cache.some(role => role.name === 'General President')){
            message.channel.send("you dont have permission for this action")
            return;
        }

        if(!profile){
            message.channel.send("<@"+message.author.id+">, the user you mentioned is invalid")
            return;
        }
        if(isNaN(args[2])){
            message.channel.send("<@"+message.author.id+">, the amount you set is invalid");
            return;
        }

        bot.data[profile.id].salary=parseInt(args[2]);

        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        });

        message.channel.send("**"+profile.displayName+"**'s salary has been set to "+args[2])
    }   
}