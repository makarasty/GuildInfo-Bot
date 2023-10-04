# Example Server Info
The bot is created similarly to the Server Info bot

![image](https://github.com/makarasty/Example-Server-Info-Discord-Bot/assets/71918286/abb19663-9b40-4b43-8f0a-db81215d4b6a)

# Example config
```js
module.exports = {
	// > Basic settings
	Token: 'Put your token here',

	// > Server Info
	ServerInfo: {
		/*
		* {guildStatusOfflineUsers}	// ? all users with offline status
		* {guildStatusOnlineUsers}	// ? all users with online status
		* {guildStatusIdleUsers}	// ? all users with idle status
		* {guildStatusDndUsers}		// ? all users with dnd status

		* // > пользователи
		* {guildAllOnlineUsers}		// ? all users online
		* {guildAllUsersBotsCount}	// ? all guild members
		* {guildAllUsersCount}		// ? all guild users without bots
		* {guildAllBotCount}		// ? all guild bots

		* // > емодзи
		* {guildEmojisCount}		// ? all emojis count
		* {guildAnimatedEmojis}		// ? all animated emojis count
		* {guildStaticEmojis}		// ? all static emojis count

		* // > каналы
		* {guildAllChannels}		// ? all channels count
		* {guildTextChannels}		// ? all text channels count
		* {guildVoiceChannels}		// ? all voice channels count

		* // > Роли
		* {guildRolesCount}			// ? all roles count

		* // > другое
		* {botUsers}				// ? all bot users
		* {botEmojis}				// ? all bot emojis
		* {botChannels}				// ? all bot channels
		* {botGuilds}				// ? all bot guilds
		* {botPing}					// ? bot ws ping
		* {botHeapRem}				// ? bot heap rem
		* {botRssRem}				// ? bot Rss rem
		*/
		Guilds: [
			{
				// > Guild id
				guildId: '717073717020065863',
				// > VC channels
				channels: [
					{
						name: '╭「👥」 {guildAllUsersBotsCount}',
						// > VC id
						id: '1088868332826013847'
					},
					{
						name: '╰「🤖」{guildAllBotCount}}',
						// > VC id
						id: '1088868462350323722'
					},
				]
			},
			{
				// > Guild id
				guildId: '592344029354786817',
				// > VC channels
				channels: [
					{
						name: '┃「👤」 {guildStatusOfflineUsers}',
						// > VC id
						id: '1034544422609748029'
					},
				]
			},
		]
	}
}
```
# Dependencies
* `node.js: 18+`
* `bluebird: ^3.7`
* `discord.js: ^14`
# Installing
* `npm i`
* `node index.js`
