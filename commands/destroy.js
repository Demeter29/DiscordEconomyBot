const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports ={
    name:'destroy',
    description: "destroys money from your balance",
    execute(message, args){
        let profile=bot.data[message.member.id]

        if(!args[1]){
            message.channel.send("you need to set an amount")
            return;
        }
        if(isNaN(args[1])){
            message.channel.send("the amount you want to burn needs to be a number");
            return;
        }
        if(profile.balance<args[1]){
            message.channel.send("you cant burn more credit than what you have");
            return;
        }

        profile.balance-=args[1];

        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        message.channel.send(args[1]+" credit burned");
        });
    }
}