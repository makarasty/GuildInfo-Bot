/**@type {import('types').IConfiguration}*/
const config = {
	// Display additional information about the bot's actions?
	DetailedLogging: true,

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
					// Channel name with patterns
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