module.exports = {
    commands: ['add', 'sum', 'sumar'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<num1> <num2>',
    description: 'Suma 2 numeros',
    callback: (message, arguments, text) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]
        const result = num1 + num2

        console.log(result)
        if(result === NaN){
            return message.reply('Asegurate de escribir bien el comando')
        }
        message.reply(`El resultado de la suma es **${result}**`)
    },
}