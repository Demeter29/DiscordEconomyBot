const Discord= require('discord.js');
const bot = new Discord.Client();
bot.data = require('../data.json');
const fs = require('fs');
const config=require("../config.json")

module.exports ={
    name:'balance',
    description: "checks your balance",
    execute(message, args){


        let profile=message.member;
        if(args[1]){
            if(!message.member.roles.cache.some(role => role.id === config.adminRoleID)){
                message.channel.send("you dont have permission for this action")
                return;
            }   
            profile=message.mentions.members.first();
        }
        try{
        const balanceEmbed = new Discord.MessageEmbed()
        .setTitle("Alemendrian Credit Balance")
        .setAuthor(profile.displayName)
        .addField("Balance:", bot.data[profile.id].balance, true)
        .addField(" Daily Salary:", bot.data[profile.id].salary, true)
        .addField("Citizen Since:", joinedAtDay(profile))
        .setFooter("total credit in circulation: "+totalCirculation()+", you own "+CirculationPercentage(profile)+"%")
        .setThumbnail(profile.user.displayAvatarURL())
        .setColor("#ff7c00");
        
        message.channel.send(balanceEmbed);

        function joinedAtDay(profile2){
            let time=profile2.joinedAt.toString();

            return time.substring(4,15);
        }

        function totalCirculation(){
            let output=0;
            for(let profileID in bot.data){
                let profile=bot.data[profileID]
                output+=profile.balance;
            
            }
            return output;
        }

        function CirculationPercentage(profile){
            let balance=bot.data[profile.id].balance;
            return Math.floor(balance/totalCirculation()*10000)/100
      
        }
        }catch(err){
            message.channel.send("<@"+message.author.id+">, the user you mentioned is invalid, correct use is e!balance @John")
        }
        

       

        
        
    }
}