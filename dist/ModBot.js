const os = require('os');

/**
 * @param {number} bytes
 */
function toMB(bytes) {
	return (bytes / 1048576).toFixed(2);
}

/**
 * @param {import('../index.js')} client
 */
function ModBot(client) {
	const memoryUsage = process.memoryUsage()
	const freeMemoryBytes = os.freemem()

	const object = {
		"{bot-ping}": client.ws.ping,
		"{bot-users-count}": client.users.cache.size,
		"{bot-emojis-count}": client.emojis.cache.size,
		"{bot-channels-count}": client.channels.cache.size,
		"{bot-guilds-count}": client.guilds.cache.size,
		"{bot-network-status}": client.ws.status,
		"{bot-memory-heap}": toMB(memoryUsage.heapUsed),
		"{bot-memory-rrs}": toMB(memoryUsage.rss),
		"{bot-memory-free}": toMB(freeMemoryBytes),
	}

	console.log(object);

	return object
}

module.exports = ModBot
