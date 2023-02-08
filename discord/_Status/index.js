const { Playing, Streaming, Listening, Watching, Custom, } = require('discord.js').ActivityType
module.exports = async function (client) {
	client.user.setActivity(
		'Example Server Info Bot',
		{
			type: Playing,
			url: 'https://www.twitch.tv/makarasty'
		}
	)
	console.log('Status has changed!')
}
/* 
* Made by https://github.com/makarasty 
*/