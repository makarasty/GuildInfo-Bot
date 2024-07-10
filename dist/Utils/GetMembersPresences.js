/**
 * @param {import('discord.js').Guild} guild
 */
function GetMembersPresences(guild) {
	let allUsers = 0;
	let offlineUsers = 0;
	let onlineUsers = 0;
	let idleUsers = 0;
	let dndUsers = 0;

	let allBots = 0;
	let offlineBots = 0;
	let onlineBots = 0;
	let idleBots = 0;
	let dndBots = 0;

	const cachedMembersValues = guild.members.cache.values();

	for (const member of cachedMembersValues) {

		const status = member.presence?.status || 'offline';
		const isBot = member.user.bot;

		isBot ? allBots++ : allUsers++;

		switch (status) {
			case 'online':
				isBot ? onlineBots++ : onlineUsers++;
				break;
			case 'idle':
				isBot ? idleBots++ : idleUsers++;
				break;
			case 'dnd':
				isBot ? dndBots++ : dndUsers++;
				break;
			default:
				isBot ? offlineBots++ : offlineUsers++;
				break;
		}
	}

	return {
		bots: {
			allBots,
			offlineBots,
			onlineBots,
			idleBots,
			dndBots
		},
		users: {
			allUsers,
			offlineUsers,
			onlineUsers,
			idleUsers,
			dndUsers
		}
	}
}

module.exports = GetMembersPresences