const mongo = require('./mongo')
const Bank = require('../../models/BankAccount')
const { Message } = require('discord.js')
const mongoose = require('mongoose')
const findError = require('./errorFind')

module.exports.newBankAccount = async (numberAccount, password, name) => {
    let task = false
    if(password === 'NaN'){
        let randomPass = Math.random()*9+1
        password = randomPass * 1000
    }
    let result;
    await new Bank({
        numberAccount: numberAccount,
        password: password,
        account: {
            name: name
        }
    }).save().then(doc => {
        task = true
        result = doc
    })
    if(!task){
        return findError('Error al crear cuenta')
    }
    return result
}
module.exports.getBankAccount = async (numberAccount, password) => {
    let task = false
    let results
    await Bank.findOne({numberAccount, password}).then(account => {
        if(account){
            results = account
            task = true
        }
    })
    if(!task){
        return findError('Error al encontrar la cuenta')
    }
    return results
}
module.exports.searchAccount = async (numberAccount) => {
    let results
    let task = false
    let errormsg
    await Bank.findOne({numberAccount}).then(doc => {
        if(doc){
            results = doc
        } else {
            return errormsg = 'No se encontro la cuenta'
        }
    })
    if(!results){
        return findError(errormsg)
    }
    return results
}
module.exports.transMoney = async (numberAccount, password, targetAccount, value) => {
    let error
    let task = false
    await this.getBankAccount(numberAccount, password).then(async doc => {
        if(doc){
            const account = doc.account
            await this.searchAccount(targetAccount).then(async targetaccount => {
                if(targetaccount){
                    target = targetaccount.account
                    if(account.money >= value){
                        this.levelTransfChecker(account.level).then(async maxTrans => {
                            if(value >= maxTrans){
                                error = `Tu cuenta no puede transferir esa cantidad porque es ${account.level}, solo puedes transferir ${maxTrans}`
                            }
                            this.addMoney(targetAccount, value).then(addcomplete => {
                                if(addcomplete){
                                    this.removeMoney(numberAccount, value).then(removecomplete => {
                                        if(removecomplete){
                                            task = true
                                        } else {
                                            error = 'Error al remover'
                                        }
                                    })
                                } else {
                                    error = 'Error al agregar el dinero'
                                }
                            })
                        })
                    } else {
                        error = 'No tiene el suficiente dinero'
                    } 
                } else {
                    error = 'No se encontro la cuenta objetivo'
                }
            })
        } else {
            error = 'No se encontro la cuenta'
        }
    })
    if(!task){
        return findError(error)
    }
    return task
}

module.exports.levelTransfChecker = async (level) => {
    let maxTrans
    if(level <= 0){
        maxTrans = 1000
    } else if(level === 1){
        maxTrans = 1500
    } else if(level === 2){
        maxTrans = 2500
    } else if(level >= 3){
        maxTrans = Infinity
    }
    return maxTrans
}
module.exports.addMoney = async (account, quantity) => {
    console.log(`Cuenta a transferir: ${account} Cantidad: ${quantity}`)
    let error
    let task = false
    await this.searchAccount(account).then(async acc => {
        let target = acc
        if(acc){
            let sum = acc + quantity
            console.log(acc.account.money)
            await Bank.findOneAndUpdate({numberAccount: acc.numberAccount}, { account: { money: acc.account.money + quantity, name: acc.account.name} } , { new: true }).then(doc => {
                if(doc.account.money){
                    task = true
                } else {
                    error = 'No se pudo agregar el dinero'
                }
            })
        } else {
            error = 'Error al encontrar la cuenta'
        }
    })
    if(!task){
        return findError(error)
    }
    return task
}

module.exports.removeMoney = async (numberAccount, quantity) => {
    let task = false
    let error
    this.searchAccount(numberAccount).then(async acc => {
        console.log(acc.account)
        console.log(`Numero de cuenta objetivo: ${numberAccount} Cantidad: ${quantity}`)
        if(acc){
            await Bank.findOneAndUpdate({ numberAccount: numberAccount }, { account: { money: acc.account.money - quantity, name: acc.account.name } } , { upsert: true, new: true }).then(doc => {
                if(doc.account.money){
                    task = true
                } else {
                    error = 'Error al remover el dinero'
                }
            })
        } else {
            error = 'Error al encontrar la cuenta'
        }
    })
    if(!task){
        return findError(error)
    }
    return task
}