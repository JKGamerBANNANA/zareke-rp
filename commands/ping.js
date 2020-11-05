module.exports = {
    name: "ping",
    description: "Muestra un mensaje para saber si el bot esta activo",
    aliases: ["ping", "p"],
    callback: (message) => {
        message.reply("Pong!");
    }
}