const UserInventory = require("../../models/UserInventory")
const bank = require('./economyfunc')

module.exports.getInventory = async (id) => {
    let results
    await UserInventory.findOne({id: id}).then(user => {
        if(!user){
            console.log('Error al obtener el inventario')
        }
        results = user
    })
    return results
}
module.exports.newInventoryUser = async (id, username) => {
    let password = Math.random()*10000+1
    let bankdocument
    let inventorydocument
    await bank.newBankAccount(id, password, username).then(async doc => {
        bankdocument = doc
        console.log('Cuenta de banco creada\n' + bankdocument)
        await new UserInventory({
            id: id,
            user: {
                name: username,
                activeaccount: {
                    numberAccount: bankdocument.numberAccount,
                    password: bankdocument.password
                } 
            }
        }).save().then(doc => {
            inventorydocument = doc
            console.log('Inventario creado\n' + inventorydocument)
        })
    })
    return inventorydocument
}

module.exports.getMoney = async (id) => {
    let money
    this.getInventory(id).then(inventory => {
        if(!inventory){
            money = 'Error'
        }
        money = inventory.user.inventory.money
    })
    return money
}