const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports ={
    name: 'expense',
    description: "shows how much money does the president spends each day on salaries",
    execute(message, args){
        //let allowedRole = message.guild.roles.cache.find("name", "General President");
        if(!message.member.roles.cache.some(role => role.name === 'General President')){
            message.channel.send("you dont have permission for this action")
            return;
        }
        
        let output=0;
        for(let profileID in bot.data){
            output+=bot.data[profileID].salary;
        }
        message.channel.send("the daily expense on salaries is "+output +" credit")
    }
}