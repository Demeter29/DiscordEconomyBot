const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports={
    name: "pay",
    description: "pay money to other users",
    execute(message, args){
        try{

        if(!message.mentions.users.first()){
            message.channel.send("<@"+message.author.id+">, invalid command, you need to mention the user, example: !pay @John 5")
            return;
        }
        if(args[2]<1|| args[2]!=Math.floor(args[2])){
            message.channel.send("<@"+message.author.id+">, the amount needs to be a positive whole number");
            return;
        }

        let profile=bot.data[message.author.id];
        let target=bot.data[message.mentions.users.first().id];
            console.log(target)
        //error handling
        if(isNaN(args[2])){
            message.channel.send("<@"+message.author.id+">, invalid command, you need to set an amount as a number to pay, example: !pay @John 5")
            return;
        }
        if(profile.balance<args[2]){
         message.channel.send("<@"+message.author.id+">, you dont have enough credit for this transaction");
         return;
        }
        //
        profile.balance-=parseInt(args[2]);
        target.balance+=parseInt(args[2]);
        message.channel.send(`**${message.member.displayName}** sent **${message.mentions.members.first().displayName}** ${args[2]} credit`)


        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        });
        }catch(err){
            message.channel.send("invalid command")
        }
    }
}