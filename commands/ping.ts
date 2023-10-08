import { SlashCommandBuilder } from 'discord.js';

const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: { reply: (arg0: string) => any; }) {
		return interaction.reply('Pong!');
	},
};

export default command;

 
