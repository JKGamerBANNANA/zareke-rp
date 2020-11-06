const Discord = require('discord.js');
const mongo = require('mongoose');
const client = new Discord.Client()


const loadCommands = require('./commands/load-commands')

const config = require('./config.json');
const inventory = require('./src/functions/inventoryfunc')

client.on('ready', async () => {
    console.log('I\'m ready!');
    loadCommands(client)

    mongo.connect(config.mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(mongo => console.log('Mongo connection is ready'))
});

client.on("guildMemberAdd", async member => {
    await inventory.getInventory(member.id).then(user => {
        if(!user){
            inventory.newInventoryUser(member.user.id, member.user.username).then(doc => {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Bienvenido a ' + member.guild.name)
                    .setThumbnail(member.guild.iconURL({dynamic: true}))
                    .setAuthor('Zareke RP Bot', config.botIcon)
                    .setDescription('Se te acaba de crear una cuenta de banco')
                    .addField('Numero de cuenta', doc.user.activeaccount.numberAccount)
                    .addField('Contraseña', doc.user.activeaccount.password)
                return member.send(embed)
            })
        }
    })
    
})

client.login(config.token);