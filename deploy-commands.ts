import { REST, Routes } from 'discord.js';
import { env } from "./utils/config";
import { allCommands } from './commands';

const commands = allCommands().map((file) => file.data.toJSON());

const rest = new REST({ version: '10' }).setToken(
  env.DISCORD_TOKEN
);

console.log(`Started refreshing ${commands.length} application commands.`);

const data = (await rest.put(
  Routes.applicationCommands(env.DISCORD_CLIENT_ID),
  { body: commands }
)) as unknown[];

console.log(`Successfully reloaded ${data.length} application commands.`);