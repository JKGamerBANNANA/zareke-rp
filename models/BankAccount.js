const {Schema, model} = require("mongoose")

const BankAccount = Schema({
    numberAccount: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account: {
        level: {
            type: Number,
            default: 0
        },
        money: {
            type: Number,
            default: 0
        },
        name: {
            type: String,
            required: true
        }
    }
})
module.exports = model("bankaccounts", BankAccount)