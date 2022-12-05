const { SlashCommandBuilder, InteractionCollector } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		// Defered reactions acknowledge request within 3s limit, but allow for the program to finish running before responding to the user
		await interaction.deferReply();
		await wait(4000);
		//await interaction.reply('Pong!'); // Public Response
		//await interaction.reply({ content: 'Secret Pong!', ephemeral: true }); //Sends back message to the requestor only // The reply after a deferReply must be an editReply
		await wait(2000);
		await interaction.editReply({ content: 'Secret Pong x2!', ephemeral: true }); // Edited response can be sent up to 15min later
	},
};