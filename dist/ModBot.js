const os = require('os');

/**
 * @param {import('../index.js')} client 
 * @returns 
 */
async function ModBot(client) {
	const memoryUsage = process.memoryUsage()
	const freeMemoryBytes = os.freemem()

	const heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2)
	const rrsUsed = (memoryUsage.rss / 1024 / 1024).toFixed(2)
	const freeMemory = (freeMemoryBytes / 1024 / 1024).toFixed(2)

	const object = {
		"{bot-ping}": client.ws.ping,
		"{bot-users-count}": client.users.cache.size,
		"{bot-emojis-count}": client.emojis.cache.size,
		"{bot-channels-count}": client.channels.cache.size,
		"{bot-guilds-count}": client.guilds.cache.size,
		"{bot-network-status}": client.ws.status,
		"{bot-started-timestamp}": `<t:${client.readyTimestamp}>`,
		"{bot-memory-heap}": heapUsed,
		"{bot-memory-rrs}": rrsUsed,
		"{bot-memory-free}": freeMemory,
	}

	return object
}

module.exports = ModBot
