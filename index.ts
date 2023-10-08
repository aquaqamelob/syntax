import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from "./utils/config";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		interaction.reply('Pong.');
	} else if (commandName === 'beep') {
		interaction.reply('Boop.');
	} else if (commandName === 'server') {
		interaction.reply(`Guild name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`);
	} else if (commandName === 'user-info') {
		interaction.reply('Your username: ' + interaction.user.username + '\nYour ID: ' + interaction.user.id);
	}
});

// Log in to Discord with your client's token
client.login(env.DISCORD_TOKEN);
