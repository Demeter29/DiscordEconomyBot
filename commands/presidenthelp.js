const Discord= require('discord.js');
const bot = new Discord.Client();

module.exports={
    name: "presidenthelp",
    description: "information on how the bot works for the president",
    execute(message, args){
        if(!message.member.roles.cache.some(role => role.name === 'General President')){
            message.channel.send("you dont have permission for this action")
            return;
        }
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Almendria Economy President commands")
        .setDescription("available commands")
        .addField("e!print <amount>", "prints money and add it to your balance.")
        .addField("e!salary @user <amount>" ,"sets the daily salary for the user you mentioned with the amount you set, example: e!salary @John 10")
        .addField("e!destroy <amount>", "burns that amount of money from your balance.")
        .addField("e!expense", "shows how much total credit do you give out for salaries daily.")
        .setFooter("for the other commands that the citizens can also use, use the e!help command.")
        .setColor("#ff7c00")


        message.channel.send(helpEmbed)
    }
}