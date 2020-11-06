const { transMoney } = require("../../src/functions/economyfunc")
const Discord = require('discord.js')
const {botIcon} = require('../../config.json')

module.exports = {
    commands: ['transf', 'transferir', 'transac'],
    description: 'Transfiere dinero a otro usuario',
    minArgs: 4,
    maxArgs: 4,
    expectedArgs: '<Account> <Password> <TargetAccount> <Quantity>',
    callback : async (message, arguments, text) => {
        let account = arguments[0]
        let password = arguments[1]
        let targetAccount = arguments[2]
        let quantity = arguments[3]
        console.log(`Cuenta: ${account} Contraseña: ${password} ${targetAccount} Cantidad: ${quantity}`)
        await transMoney(account, password, targetAccount, quantity).then(complete => {
            if(complete){
                const embed = new Discord.MessageEmbed()
                    .setAuthor('Zareke Bot', botIcon)
                    .setTitle('Transferencia exitosa')
                    .setColor('RED')
                    .addField('Cantidad transferida', quantity)
                    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                    .setImage(botIcon)
                    .setFooter('Tramsferido por: ' + message.author.displayAvatarURL({dynamic: true}))
                    return message.reply(embed)
            } else {
                return message.reply('Algo ocurrio mal')
            }
        })
        message.delete()
    }
}