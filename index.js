const Discord = require('discord.js');
const bot = new Discord.Client();
const cron=require('cron');
const config = require("./config.json");

bot.data = require('./data.json');
const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    
}

bot.on('ready', () => {
    console.log("im ready!")

});

bot.on('message', (message) => {
    try{

    if (!message.content.startsWith(prefix)) return;

    message.content.toLowerCase();
    let args = message.content.slice(prefix.length).split(" ");

    switch (args[0]) {
        case "balance":
            bot.commands.get('balance').execute(message, args);
            break; 
        case "print":
            bot.commands.get('print').execute(message, args);
            break;
        case "destroy":
            bot.commands.get('destroy').execute(message, args);
            break;
        case "refresh":
            bot.commands.get('refresh').execute(message, args);
            break;
        case "pay":
            bot.commands.get('pay').execute(message, args);
            break;
        case "salary":
            bot.commands.get('salary').execute(message,args);
            break;
        case "expense":
            bot.commands.get('expense').execute(message, args);
            break;
        case "help":
            bot.commands.get('help').execute(message,args);
            break;
        case "presidenthelp":
            bot.commands.get('presidenthelp').execute(message,args);
            break;
            
    }   
   }catch(err){
    bot.users.cache.get(config.ownerID).send("ERR! channel: "+message.channel.name+" ```"+err+"```");
   }
    
    
});

bot.on('guildMemberAdd', member =>{
    try{
    bot.data[member.id]={
        "balance": 0 ,
        "salary": 0,
    },
    
    fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
        if(err) throw err;
    }); 
        
    }catch(err){
    bot.users.cache.get(config.ownerID).send("ERR! at guildMemberAdd ```"+err+"```");
    }
}); 

//daily payment
try{
let paymentTime= new cron.CronJob('00 0 1 * * *', ()=>{ 
    for(let profileID in bot.data){
        let profile=bot.data[profileID]

        if(bot.data[config.presidentID].balance<profile.salary){
            bot.channels.cache.find(channel => channel.id === config.systemChannelID).send("the president didn't have enough money to give out the salaries!");
            return;
        }

        bot.data[config.presidentID].balance-=profile.salary;
        profile.balance=Number(profile.balance)+Number(profile.salary);

        
        fs.writeFile ("./data.json", JSON.stringify(bot.data, null, 4), err =>{
            if(err) throw err;
        });
    }       
    bot.channels.cache.find(channel => channel.id === config.systemChannelID).send("payments sent out!");
})
paymentTime.start();
//
}catch(err){
    bot.users.get(config.ownerID).send("ERR! at daily payment ```"+err+"```")
}

bot.login(config.token);