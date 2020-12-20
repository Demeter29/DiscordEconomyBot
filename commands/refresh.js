const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');

module.exports ={
    name: "refresh",
    description: "refreshes the data when updating the bot",
    execute(message, args){

        if(message.author.id!=269161773217611786) return; //Doggi's ID
        message.guild.members.cache.forEach(member => {
            if(!bot.data[member.id]){
                bot.data[member.id]={
                    "balance": 0 ,
                    "salary": 0,
                }
            }
        });
        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        }); 
    }
}