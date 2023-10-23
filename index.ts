import { Client, Events, GatewayIntentBits, userMention } from 'discord.js';
import { env } from './utils/config';
// import prisma from './utils/prisma';
import { contextMenuCommands, slashCommands } from './commands';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    slashCommands
      .find((c) => c.data.name === interaction.commandName)
      ?.execute(interaction);
  }

  if (interaction.isMessageContextMenuCommand()) {
    contextMenuCommands
      .find((c) => c.data.name === interaction.commandName)
      ?.execute(interaction);
  }
});

// Log in to Discord with your client's token
client.login(env.DISCORD_TOKEN);
