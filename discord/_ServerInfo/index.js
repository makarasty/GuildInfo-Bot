module.exports = async function (client) {
	client.config.ServerInfo.Guilds.forEach(
		async ({ guildId, channels }) => {
			const guild = client.guilds.cache.get(guildId), members = guild.members.cache
			channels.forEach(
				async ({ name, id }) => {
					const ch = client.channels.cache.get(id)
					if (name.includes('{all_online_users}')) name = name.replace('{all_online_users}',
						members.filter(m => !m.user.bot && m.presence?.status).size)
					if (name.includes('{all_offline_users}')) name = name.replace('{all_offline_users}',
						members.filter(m => !m.user.bot && !m.presence?.status).size)
					if (name.includes('{users_status_online}')) name = name.replace('{users_status_online}',
						members.filter(m => !m.user.bot && m.presence?.status == 'online').size)
					if (name.includes('{users_status_idle}')) name = name.replace('{users_status_idle}',
						members.filter(m => !m.user.bot && m.presence?.status == 'idle').size)
					if (name.includes('{users_status_dnd}')) name = name.replace('{users_status_dnd}',
						members.filter(m => !m.user.bot && m.presence?.status == 'dnd').size)
					if (name.includes('{all_users_count}')) name = name.replace('{all_users_count}',
						members.filter(m => !m.user.bot).size)
					if (name.includes('{all_bots_count}')) name = name.replace('{all_bots_count}',
						members.filter(m => m.user.bot).size)
					if (ch.name != name) {
						let preName = ch.name
						console.log(`Wait:  ${name}`)
						ch.setName(name).then(() => console.log(`Done:  ${preName}  to:  ${name}`))
					}
				}
			)
		}
	)
}
/* 
* Made by https://github.com/makarasty 
*/