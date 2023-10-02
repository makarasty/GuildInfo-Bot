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
		this.Events();

		await this.login(Config.Token);
		console.info(`Discord Bot started! (${this.user.tag})`);
	}
	async Events() {
		async function BotReady(client) {

			// ? Setting bot status
			setTimeout(() => SetBotStatus(client), 100_000);
			SetBotStatus(client);

			// ? Starting server-info system
			setInterval(() => ServerInfoSystem(client), 401_000);
			ServerInfoSystem(client);
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
	const guildChannels = await guild.channels.fetch();
	const guildMembers = await guild.members.fetch({ withPresences: true });
	const guildEmojis = await guild.emojis.fetch();
	const guildRoles = await guild.roles.fetch();

	const botUsers = guildMembers.filter(({ user }) => user.bot);
	const users = guildMembers.filter(({ user }) => !user.bot);

	const onlineStatusArray = ['online', 'idle', 'dnd'];
	const offlineStatusArray = ['offline', 'invisible'];

	const onlineUsersCount = users.filter(({ presence }) => presence ? onlineStatusArray.includes(presence.status) : undefined).size;
	const usersStatusOffline = users.filter(({ presence }) => presence ? offlineStatusArray.includes(presence.status) : undefined).size;
	const usersStatusOnline = users.filter(({ presence }) => presence ? presence.status === 'online' : undefined).size;
	const usersStatusIdle = users.filter(({ presence }) => presence ? presence.status === 'idle' : undefined).size;
	const usersStatusDnd = users.filter(({ presence }) => presence ? presence.status === 'dnd' : undefined).size;

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
	});

	return newText
}
/**
 * 
 * @param {DiscordBot} client 
 */
async function ServerInfoSystem(client) {
	for (const guildConfig of Config.ServerInfo.Guilds) {
		const { channels, guildId } = guildConfig;

		const guild = await client.guilds.fetch(guildId)
			.catch(() => console.error(`Guild ${guildId} not found!`));

		if (!guild) continue;

		for (const channelConfig of channels) {
			const { name, id } = channelConfig;

			const channel = await guild.channels.fetch(id)
				.catch(() => console.error(`Channel ${id} not found!`));

			if (!channel) continue;

			const newChannelName = await FormatChannelName(name, client, guild);

			if (channel.name != newChannelName) {
				const lastChannelName = channel.name;
				console.info(`Waiting for renaming: ${newChannelName}`);

				channel.setName(newChannelName)
					.then(() => console.info(`Channel renamed: ${lastChannelName} => ${newChannelName}`))
					.catch(() => console.error(`Channel not renamed: ${lastChannelName} !=> ${newChannelName}`));
			}
		}
	}
}
/**
 * 
 * @param {DiscordBot} param0 
 */
async function SetBotStatus({ user }) {
	user.setActivity('Example Server-Info Bot',
		{
			type: ActivityType.Playing,
			url: 'https://www.twitch.tv/makarasty'
		}
	)
}
new DiscordBot().Init();