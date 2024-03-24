interface IGuild {
	GuildId: string;
	Channels: IChannel[];
}

interface IChannel {
	Id: string;
	Name: string;
}

interface IConfiguration {
	DetailedLogging: boolean;
	Token: string;
	ActivityText: string;
	ActivityUpdateInterval: number,
	ChannelsRenameInterval: number,
	Guilds: IGuild[];
}

export { IConfiguration }