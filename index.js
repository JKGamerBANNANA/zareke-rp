const Discord = require("discord.js")
const client = new Discord.Client();

client.on("ready", () => {
    console.log("Im ready!");
});

client.on("message", message => {
    if(message.content === "ping"){
        message.reply("PONG!")
    }
    if(message.author.id === "391336623234744340"){
        message.reply("Eres molesto ¿Sabes?")
    }
});


client.login("NzczNzE3MjkxMzU0ODE2NTQz.X6NSYQ.WG8fceUw8W72u094ugxD8pBz8QQ")