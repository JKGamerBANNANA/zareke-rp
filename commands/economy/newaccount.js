const Discord = require('discord.js')
const bank = require('../../src/functions/economyfunc')

module.exports = {
    commands: 'newaccount',
    description: 'Crea una nueva cuenta de banco',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '(Password)',
    callback: async (message, arguments, text) => {
        let randomPass = Math.random()*9+1
        let password = randomPass * 1000
        let numberaccount  = message.author.id
        if(arguments[0]) password = arguments[0]
        bank.newBankAccount(numberaccount, password, message.author.username).then(account => {
            if(account){
                const embed = new Discord.MessageEmbed()
                    .setAuthor('Zareke Roleplay', 'https://media.discordapp.net/attachments/760592821140455434/773999377886871572/Z_GLITCH_YT.png?width=560&height=560')
                    .setTitle('Cuenta de banco creada correctamente')
                    .setColor('GREEN')
                    .setDescription('Cuenta creada para: ' + account.account.name)
                    .addField('Numero de cuenta', account.numberAccount)
                    .addField('Password', account.password)
                    .setImage('https://media.discordapp.net/attachments/760592821140455434/773999377886871572/Z_GLITCH_YT.png?width=560&height=560')
                    .setTimestamp()
                message.author.send(embed)
                return message.reply('Cuenta creada correctamente')
            } else {
                return message.channel.send('Hubo un error al crear tu cuenta')
            }
        })
        message.delete()
    }
}