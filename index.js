const Discord = require("discord.js")
const client = new Discord.Client();
const WOKcommands = require("wokcommands");
require("dotenv").config()

const config = require("./config.json");

const token = config.token;


client.on("ready", () => {
    new WOKcommands(client, "commands", "features")
    .setSyntaxError("Uso incorrecto del comando.")
    .setDefaultPrefix("?");
    console.log("Im ready!");
});

client.on("message", message => {
    if(message.content === "ping"){
        message.reply("PONG!")
    }
    if(message.author.id === "391336623234744340" && message.content === "ping"){
        message.reply("Eres molesto ¿Sabes?")
    }
});


client.login(token);