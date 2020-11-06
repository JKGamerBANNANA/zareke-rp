const Discord = require('discord.js')
const Inventory = require('../../src/functions/inventoryfunc')
const Bank = require('../../src/functions/economyfunc')
const {botIcon, moneda} = require('../../config.json')

module.exports = {
    commands: ['balance', 'bal'],
    description: 'Te da informacion sobre cuanto dinero tienes',
    callback: async (message, arguments, text) => {
        const userID = message.author.id
        const username = message.author.username
        let paper
        let bankmoney
        let exitCode = false
        await Inventory.getInventory(userID).then(async inventory => {
            if(!inventory){
                await Inventory.newInventoryUser(userID, username).then(async doc => {
                    paper = doc.user.inventory.money
                    const account = doc.user.activeaccount
                    await Bank.getBankAccount(account.numberAccount, account.password).then(bankdoc => {
                        if(bankdoc){
                            bankmoney = bankdoc.account.money
                            exitCode = true
                        }
                    })
                })
            }
            if(inventory){
                paper = inventory.user.inventory.money
                console.log(paper)
                const account = inventory.user.activeaccount
                console.log(account)
                await Bank.getBankAccount(account.numberAccount, account.password).then(bankdoc => {
                    if(bankdoc){
                        let bank = bankdoc.account
                        bankmoney = bank.money
                        exitCode = true
                    }
                })
            }
        })
        if(exitCode){
            const embed = new Discord.MessageEmbed()
                .setAuthor('Zareke RP', botIcon)
                .setTitle('Tus riquezas')
                .setDescription('Estos son tus estados de cuenta')
                .setColor('GREEN')
                .addField('Dinero en cuenta principal', `${moneda}${bankmoney}`)
                .addField('Dinero en inventario', `${moneda}${paper}`)
                .addField('Total', `${moneda}${bankmoney + paper}`)
            message.reply(embed)
        }
        if(!exitCode){
            message.reply('Ocurrio un error')
        }
    }
}