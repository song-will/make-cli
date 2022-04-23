
const actions = {
    create: {
        alias: 'crt',
        description: 'create a project', 
        examles: [
            'make-cli create <project>'
        ]
    },
    config: {
        alias: 'conf',
        description: 'config project variable',
        examles: [
            'make-cli config set <key> <value>',
            'make-cli config get <key>'
        ]
    },
    '*': {
        alias: '',
        description: 'command not found',
        examles: []
    }
}

module.exports = {
    actions
}