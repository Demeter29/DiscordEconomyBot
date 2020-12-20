const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports ={
    name: 'print',
    description: "prints money",
    execute(message, args){
        //let allowedRole = message.guild.roles.cache.find("name", "General President");
        if(!message.member.roles.cache.some(role => role.name === 'General President')){
            message.channel.send("you dont have permission for this action")
            return;
        }
        
        
        if(!args[1]){
            message.channel.send("<@"+message.author.id+">, invalid command, you need to set an amount, example: !print 500");
            return;
        }
        if(isNaN( args[1])){
            message.channel.send("<@"+message.author.id+">, invalid command, you need to set an amount with numbers, example: !print 500")
            return;
        }
        if(args[1]<1|| args[1]!=Math.floor(args[1])){
            message.channel.send("<@"+message.author.id+">, the amount needs to be a positive whole number");
            return;
        }

        
        bot.data[message.author.id].balance+=parseInt(args[1]);
        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        });
        
        message.channel.send(args[1]+" credit printed")

    }
}