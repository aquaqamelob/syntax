import { REST, Routes } from 'discord.js';

import { env } from "./utils/config";


const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'server',
    description: "Replies with server info."
  },
  {
    name: "beep",
    description: "Replies with Boop!"
  },
  {
    name: "user-info",
    description: "Replies with user info."
  },
  {
    name: "remindme",
    description: "Reminds user in X minutes.",
    options: [
      {
        name: "minutes",
        description: "Number of minutes",
        type: 4, // 4 corresponds to integer type
        required: true
      }
    ]
  },
  {
    name: "tasks",
    description: "Shows user tasks."
  },
  {
    name: "add-task",
    description: "Add task to user list.",
    options: [
      {
        name: "name",
        description: "Name of the task",
        type: 3, // 3 corresponds to string type
        required: true
      }
    ]
  },
  {
    name: "remove-task",
    description: "Removes task from user list.",
    options: [
      {
        name: "id",
        description: "Id of the task",
        type: 4, // 4 corresponds to integer type
        required: true
      }
    ]
  }
];



const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
