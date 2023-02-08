const Event = require('../event.js'), ServerInfo = require('../_ServerInfo'), Status = require('../_Status')
module.exports = new Event("ready", client => {
	Status(client)
	setTimeout(async () => Status(client), 1000000)

	ServerInfo(client)
	setInterval(async () => ServerInfo(client), 401000) // > Discord limit 2 changes in 10 min

	console.log('The bot started')
})
/* 
* Made by https://github.com/makarasty 
*/