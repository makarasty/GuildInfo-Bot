const GetMembersPresences = require('./Utils/GetMembersPresences.js')

/**
 * @param {import('discord.js').Guild} guild
 */
async function ModGuild(guild) {
	const membersPresences = GetMembersPresences(guild)

	const object = {
		"{guild-invites-count}": guild.invites.cache.size,
		"{guild-bans-count}": guild.bans.cache.size,
		"{guild-commands-count}": guild.commands.cache.size,
		"{guild-threads-count}": guild.channels.cache.size - guild.channels.channelCountWithoutThreads,
		"{guild-approximate-members-count}": guild.approximateMemberCount,
		"{guild-approximate-presences-count}": guild.approximatePresenceCount,
		"{guild-channel-count}": guild.channels.channelCountWithoutThreads,
		"{guild-roles-count}": guild.roles.cache.size,
		"{guild-stickers-count}": guild.stickers.cache.size,
		"{guild-member-count}": membersPresences.bots.allBots + membersPresences.users.allUsers,
		"{guild-users-count}": membersPresences.bots.allBots,
		"{guild-bots-count}": membersPresences.users.allUsers,
		"{guild-premium-subscription-count}": guild.premiumSubscriptionCount,
		"{guild-vanity-URL-uses}": guild.vanityURLUses,
		"{guild-users-presence-offline}": membersPresences.users.offlineUsers,
		"{guild-users-presence-online}": membersPresences.users.onlineUsers,
		"{guild-users-presence-idle}": membersPresences.users.idleUsers,
		"{guild-users-presence-dnd}": membersPresences.users.dndUsers,
		"{guild-bots-presence-offline}": membersPresences.bots.offlineBots,
		"{guild-bots-presence-online}": membersPresences.bots.onlineBots,
		"{guild-bots-presence-idle}": membersPresences.bots.idleBots,
		"{guild-bots-presence-dnd}": membersPresences.bots.dndBots,
		"{guild-emojis-count}": guild.emojis.cache.size
	}

	return object
}

module.exports = ModGuild