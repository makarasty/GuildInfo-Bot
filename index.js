const { Client, Events, ActivityType, Guild } = require("discord.js");

const configuration = require("./config.js");

const ModifierModString = require('./dist/ModifierModString.js')
const ModGuild = require('./dist/ModGuild.js')
const ModBot = require('./dist/ModBot.js')

if (!configuration.Token || configuration.Token === 'Enter your token here') {
	throw new Error("You need to specify the bot's token to launch it");
}

const activityParams = {
	type: ActivityType.Playing,
	url: 'https://www.twitch.tv/makarasty'
}

/**
 * @param {ServerInfoBot} client
 */
async function botReadyEvent(client) {
	console.info(`Discord bot running as user: ${client.user.tag}`);

	await Promise.all([
		botSetStatusLoop(client),
		channelsRenameLoop(client)
	])

	setInterval(() => botSetStatusLoop(client), configuration.ActivityUpdateInterval);
	setInterval(() => channelsRenameLoop(client), configuration.ChannelsRenameInterval);
}

/**
 * @param {ServerInfoBot} client
 */
function botSetStatusLoop(client) {
	return client.user.setActivity(configuration.ActivityText, activityParams)
}

/**
 * @param {string} text
 */
function log(text) {
	configuration.DetailedLogging && console.log(text);
}

/**
 * @param {ServerInfoBot} client
 */
async function channelsRenameLoop(client) {
	log('Renaming channels...');

	const guildPromises = configuration.Guilds.map(
		async (guildConfig) => {

			const guild = (client.guilds.cache.get(guildConfig.GuildId) || await client.guilds.fetch(guildConfig.GuildId))

			const channelPromises = guildConfig.Channels.map(
				async (channelConfig) => {

					const channel = (guild.channels.cache.get(channelConfig.Id) || await guild.channels.fetch(channelConfig.Id))
					if (!channel) return console.error(`In guild "${guild.name}" (${guild.id}) ❌ Failed to fined the channel: "${channelConfig.Id}"`);

					const oldChannelName = channel.name

					const newChannelName = await getNewChannelNameUsingPattern(client, guild, channelConfig.Name)
					try {
						await channel.setName(newChannelName)

						log(`In guild "${guild.name}" (${guild.id}) ✔ Renamed channel: "${oldChannelName}" ===> "${newChannelName}" (${channel.id})`);
					} catch (error) {
						console.error(`In guild "${guild.name}" (${guild.id}) ❌ Failed to rename the channel: "${oldChannelName}" !==> "${newChannelName}" (${channel.id})`);
					}
				})

			await Promise.all(channelPromises)
		})

	await Promise.all(guildPromises)

	log('Renaming channels done!');
}

/**
 * @param {ServerInfoBot} client
 * @param {Guild} guild
 * @param {string} pattern
 */
async function getNewChannelNameUsingPattern(client, guild, pattern) {
	const [clientMod, guildMod] = await Promise.all([ModBot(client), ModGuild(guild)]);

	return ModifierModString([clientMod, guildMod], pattern);
}

/**
 * @class
 * @extends {Client<true>}
 */
class ServerInfoBot extends Client {
	constructor() {
		super({
			intents: 47007,
			shards: 0
		})
	}
	async init() {
		this.once(Events.ClientReady, botReadyEvent.bind(null, this));

		await this.login(configuration.Token)
	}
}

new ServerInfoBot().init();

module.exports = ServerInfoBot