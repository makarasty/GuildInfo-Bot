# Example Server Info
the bot is created similarly to the Server Info bot

![изображение](https://user-images.githubusercontent.com/71918286/217628482-a790e2f5-ff26-41ea-ae94-878109c38ea9.png)
# Example config
```js
module.exports = {
	// > Basic settings
	Token: 'u token here',

	// > Server Info
	ServerInfo: {
		/*
		*	{all_online_users}		All users who currently have any status (not autonomous)
		*	{all_offline_users}		All users who have no status
		*	{users_status_online}	All users are online
		*	{users_status_idle}		All users are idle
		*	{users_status_dnd}		All users are dnd
		*	{all_users_count}		All users, have status
		*	{all_bots_count}		All bots, have not status
		*/
		Guilds: [
			{
				// > Guild id
				guildId: '785107327413911592',
				// > VC channels
				channels: [
					{
						// > The maximum length of the name 32
						name: '╭「👥」 {all_online_users}',
						// > VC id
						id: '1064128493681651712'
					},
					{
						// > The maximum length of the name 32
						name: '╰「🤖」{all_bots_count}',
						// > VC id
						id: '1064128497964023919'
					},
				]
			},
			{
				// > Guild id
				guildId: '592344029354786817',
				// > VC channels
				channels: [
					{
						// > The maximum length of the name 32
						name: '┃「👤」 {all_offline_users}',
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
* `discord.js: 14`
