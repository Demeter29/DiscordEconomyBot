const Discord= require('discord.js');
const bot = new Discord.Client();

module.exports={
    name: "help",
    description: "information on how the bot works",
    execute(message, args){
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Almendria Economy")
        .setDescription("available commands and FAQs")
        .addField("e!balance", "check your balance and salary")
        .addField("e!pay @user <amount>" ,"pay another user some amount by pinging him, example: e!pay @John 40")
        .addField("-----------------", "FAQs")
        .addField("When do i get my salary?","you get it everyday at 12 am GMT-3.")
        .addField("Who sets my salary?", "the General President gets to decide your salary based on your position.")
        .addField("What can I do with the money?", "you can pay other citizens with it for their goods and services.")
        .addField("Where does the money come from?", "the president can print more money whenever he decides to and give it out for salaries but printing money won't be frequent beacuse it leads to inflation. you can always check how much money is in circulation in your balance.")
        .setColor("#ff7c00")

        message.channel.send(helpEmbed)
    }
}