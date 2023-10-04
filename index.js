const { Client, Events, ActivityType, ChannelType } = require("discord.js");

const Config = require("./config.js");

const Promise = require('bluebird');
global.Promise = Promise;

class DiscordBot extends Client {
	constructor() {
		super({
			restWsBridgeTimeout: 100,
			restTimeOffset: 0,
			intents: 47007,
			shards: 0
		})
	}
	async Init() {
		await this.Events();
		await this.login(Config.Token);
		console.info(`Discord Bot started! (${this.user.tag})\n`);
	}
	async Events() {
		async function BotReady(client) {

			// ? Setting bot status
			SetBotStatus(client);
			setTimeout(() => SetBotStatus(client), 100_000);

			// ? Starting server-info system
			ServerInfoSystem(client);
			setInterval(() => ServerInfoSystem(client), 401_000);
		}

		this.on(Events.ClientReady, BotReady);
	}
}
/**
 * 
 * @param {string} text 
 * @param {DiscordBot} client 
 * @param {import('discord.js').Guild} guild 
 * @param {import('discord.js').GuildChannel} guildChannels 
 * @returns 
 */
async function FormatChannelName(text, client, guild) {
	const [
		guildMembers,
		guildChannels,
		guildEmojis,
		guildRoles
	] = await Promise.all([
		guild.members.fetch({ withPresences: true }),
		guild.channels.fetch(),
		guild.emojis.fetch(),
		guild.roles.fetch()
	])

	const botUsers = guildMembers.filter(({ user }) => user.bot);
	const users = guildMembers.filter(({ user }) => !user.bot);

	const onlineStatusArray = ['online', 'idle', 'dnd'];
	const offlineStatusArray = ['offline', 'invisible'];

	const onlineUsersCount = users.filter(({ presence }) =>
		presence ? onlineStatusArray.includes(presence.status) : undefined
	).size
	const usersStatusOffline = users.filter(({ presence }) =>
		presence ? offlineStatusArray.includes(presence.status) : undefined
	).size
	const usersStatusOnline = users.filter(({ presence }) =>
		presence ? presence.status === 'online' : undefined
	).size
	const usersStatusIdle = users.filter(({ presence }) =>
		presence ? presence.status === 'idle' : undefined
	).size
	const usersStatusDnd = users.filter(({ presence }) =>
		presence ? presence.status === 'dnd' : undefined
	).size

	const animetedEmojis = guildEmojis.filter(({ animated }) => animated);
	const staticEmojis = guildEmojis.filter(({ animated }) => !animated);

	const processMemoryUsed = process.memoryUsage();

	const guildTextChannels = guildChannels.filter(({ type }) => type === ChannelType.GuildText);
	const guildVoiceChannels = guildChannels.filter(({ type }) => type === ChannelType.GuildVoice);

	const globalModificatorsObject = {
		"{guildallonlineusers}": onlineUsersCount,
		"{guildstatusofflineusers}": usersStatusOffline,
		"{guildstatusonlineusers}": usersStatusOnline,
		"{guildstatusidleusers}": usersStatusIdle,
		"{guildstatusdndusers}": usersStatusDnd,
		"{guildallusersbotscount}": guild.memberCount,
		"{guildalluserscount}": users.size,
		"{guildallbotcount}": botUsers.size,
		"{guildrolescount}": guildRoles.size - 1,
		"{guildemojiscount}": guildEmojis.size,
		"{guildallchannels}": guildChannels.size,
		"{guildanimatedemojis}": animetedEmojis.size,
		"{guildstaticemojis}": staticEmojis.size,
		"{guildtextchannels}": guildTextChannels.size,
		"{guildvoicechannels}": guildVoiceChannels.size,
		"{botusers}": client.users.cache.size,
		"{botemojis}": client.emojis.cache.size,
		"{botchannels}": client.channels.cache.size,
		"{botguilds}": client.guilds.cache.size,
		"{botping}": client.ws.ping || '-1',
		"{botheaprem}": (processMemoryUsed.heapUsed / 1024 / 1024).toFixed(2),
		"{botrssrem}": (processMemoryUsed.rss / 1024 / 1024).toFixed(2)
	}

	const globalModificatorsKeys = Object.keys(globalModificatorsObject);

	const regexp = new RegExp(globalModificatorsKeys.join('|').toLowerCase(), 'gi');

	const newText = text.replace(regexp, (word) => {
		return globalModificatorsObject[word.toLowerCase()] ?? word
	})

	return newText
}
/**
 * 
 * @param {DiscordBot} client 
 */
async function ServerInfoSystem(client) {
	await Promise.map(Config.ServerInfo.Guilds, async (guildConfig) => {
		const { channels, guildId } = guildConfig;

		const guild = await client.guilds.fetch(guildId)
			.catch(() => console.error(`Guild "${guildId}": Guild not found! Check config!`));

		if (guild) {
			await Promise.map(channels, async (channelConfig) => {
				const { name, id } = channelConfig;

				const channel = await guild.channels.fetch(id)
					.catch(() => console.error(`Guild "${guild.name}": Channel "${id}" not found!`));

				if (channel) {
					const newChannelName = await FormatChannelName(name, client, guild);
					const lastChannelName = channel.name;

					if (channel.name !== newChannelName) {
						console.info(`Guild "${guild.name}": Waiting for renaming: "${newChannelName}".`);

						channel
							.setName(newChannelName)
							.then(() => console.info(`Guild "${guild.name}": Channel renamed successfully: "${lastChannelName}" => "${newChannelName}".`))
							.catch(() => console.error(`Guild "${guild.name}": Channel not renamed: "${lastChannelName}" !=> ${newChannelName}".`));
					} else {
						console.info(`Guild "${guild.name}": Channel renaming skipped: "${lastChannelName}" === "${newChannelName}".`);
					}
				}
			})
		}
	})
}
/**
 * 
 * @param {DiscordBot} param0 
 */
async function SetBotStatus({ user }) {
	user.setActivity('Example Server-Info made by https://github.com/makarasty',
		{
			type: ActivityType.Playing,
			url: 'https://www.twitch.tv/makarasty'
		}
	)
}
new DiscordBot().Init();