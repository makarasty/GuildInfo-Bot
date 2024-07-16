const getMemberStats = require('./Utils/getMemberStats')

/**
 * @param {import('discord.js').Guild} guild
 */
function ModGuild(guild) {
	const membersPresences = getMemberStats(guild)

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
		"{guild-member-count}": membersPresences.bots.all + membersPresences.users.all,
		"{guild-users-count}": membersPresences.bots.all,
		"{guild-bots-count}": membersPresences.users.all,
		"{guild-premium-subscription-count}": guild.premiumSubscriptionCount,
		"{guild-vanity-URL-uses}": guild.vanityURLUses,
		"{guild-users-presence-offline}": membersPresences.users.offline,
		"{guild-users-presence-online}": membersPresences.users.online,
		"{guild-users-presence-idle}": membersPresences.users.idle,
		"{guild-users-presence-dnd}": membersPresences.users.dnd,
		"{guild-bots-presence-offline}": membersPresences.bots.offline,
		"{guild-bots-presence-online}": membersPresences.bots.online,
		"{guild-bots-presence-idle}": membersPresences.bots.idle,
		"{guild-bots-presence-dnd}": membersPresences.bots.dnd,
		"{guild-emojis-count}": guild.emojis.cache.size
	}

	console.log(object);

	return object
}

module.exports = ModGuild