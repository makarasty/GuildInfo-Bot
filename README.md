# Example Guild Info
Bot Discord, which will monitor the information and change channels once a certain amount of time, low weight, optimized!

![image](https://github.com/makarasty/GuildInfo-Bot/assets/71918286/480cab9f-3ff9-404a-aca1-9a64ee977aec)

# Example config
```js
/**@type {import('types').IConfiguration}*/
const config = {
	// Display additional information about the bot's actions?
	DetailedLogging: false,

	// Bot token
	Token: 'Enter your token here',

	// Text displayed in bot status
	ActivityText: 'https://github.com/makarasty',

	// How often the status of the bot should be updated in ms
	ActivityUpdateInterval: 100_000,

	// How often channels must be changed in ms
	ChannelsRenameInterval: 401_000,

	// Server information
	Guilds: [

		// Guild 1
		{
			GuildId: '785107327413911592',
			Channels: [
				{
					// Channel ID
					Id: '1087742580340555857',
					// Channel name with patterns (https://github.com/makarasty/GuildInfo-Bot/wiki)
					Name: 'Offline {guild-users-presence-offline}',
				},
				{
					Id: '1087742598212489298',
					Name: 'Online {guild-users-presence-online}',
				},
				{
					Id: '1088202692142313553',
					Name: 'Dnd {guild-users-presence-dnd}',
				},
			]
		},

		// Guild 2...
	]
}
module.exports = config
```

# Install
- `git clone https://github.com/makarasty/GuildInfo-Bot` Copy bot files
- `cd ./GuildInfo-Bot/` Go to bot directory
- `npm i` Install the bot components
- `>>> Configure config.js <<<` [Wiki](https://github.com/makarasty/GuildInfo-Bot/wiki)
- `node .` Start the bot 

# OS Dependencies
- Node.js

# Lib Dependencies
- discord.js


╭﹝👾﹞нрп-объявления
┃﹝🔍﹞рп-объявления
╰﹝💝﹞ивент-пинги
⟬ ⚡ ⟭  ⫗  GLOBAL


┃﹝🔍﹞головний