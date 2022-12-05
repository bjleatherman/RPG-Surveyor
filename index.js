// Added to load command files

// Nodes native file system. Reads from the 'commands' directory
const fs = require('node:fs');
// Nodes native path utility. Constructs path access for files and directories
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const internal = require('node:stream');
const { eventNames } = require('node:process');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Attaching .commands to clients ensures that there is access to commands in other files
// Collection stores and retieves commands for execution. Nativs JS class, extenting Map class
client.commands = new Collection();

// path.join constructs the path to the commands directory
const commandsPath = path.join(__dirname, 'commands');
// fs.readdirSync reads the path to the directory and returna array of all file names it contains
// The filter ensures that the only js files are retrieved
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


// Log in to Discord with your client's token
client.login(token);
