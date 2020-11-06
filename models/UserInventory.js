const {Schema, model} = require('mongoose')

const UserInventory = Schema({
    id: {
        type: String,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        inventory: {
            objects: {
                type: Array,
                default: []
            },
            money: {
                default: 0,
                type: Number
            } 
        },
        activeaccount: {
            numberAccount: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        }
    }
})

module.exports = model('UserInventory', UserInventory)