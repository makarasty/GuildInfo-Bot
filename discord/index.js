const { Client } = require("discord.js"), fs = require("fs"), config = require("../config.js")
module.exports = class Bot extends Client {
	constructor() {
		super({ restWsBridgeTimeout: 100, restTimeOffset: 0, intents: 47007, shards: "auto" })
		this.config = config, this.commands = []
	}
	async init(token) {
		fs.readdirSync("./discord/events").filter(f => f.endsWith(".js")).forEach(file => {
			const event = require(`./events/${file}`)
			this.on(event.event, event.run.bind(null, this))
		})
		this.login(token)
		console.log('All Events loaded')
	}
}
/* 
* Made by https://github.com/makarasty 
*/