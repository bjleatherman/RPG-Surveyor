const { SlashCommandBuilder, InteractionCollector } = require('discord.js');
//const wait = require('node:timers/promises').setTimeout; // Used when wait is needed

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		// Defered reactions acknowledge request within 3s limit, but allow for the program to finish running before responding to the user
		// await interaction.deferReply();  // deferReply can be public
		//await interaction.deferReply({ephemeral: true});  // deferReply can be private
		//await wait(1000);
		//await interaction.reply('Pong!'); // Public Response
		//await interaction.reply({ content: 'Secret Pong!', ephemeral: true }); //Sends back message to the requestor only // The reply after a deferReply must be an editReply
		//await interaction.editReply({ content: 'Secret Pong!', ephemeral: true });
		//await wait(1000);
		//await interaction.editReply({ content: 'Secret Pong x2!', ephemeral: true }); // Edited response can be sent up to 15min later
		//await interaction.followUp('Ponged 3 times! Wow!'); // followUp can be public
		//await interaction.followUp({ content: 'Ponged 3 times! Wow!', ephemeral: true }); // followUp cna be or ephemeral
		//await wait(1000);
		//await interaction.deleteReply(); // Replies can be deleted, this only deletes the main reply, not the follow up. IDK why

		await interaction.reply('Pong!');

		// Doesnt work???  const message = await interaction.fetchReply();
		// 				   console.log(message);
	},
};