import { Client, Events, GatewayIntentBits, userMention } from 'discord.js';
import { env } from './utils/config';
import prisma from './utils/prisma';
import command from './commands/ping';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    interaction.reply('Pong.');
  } else if (commandName === 'beep') {
    interaction.reply('Boop.');
  } else if (commandName === 'server') {
    interaction.reply(
      `Guild name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
    );
  } else if (commandName === 'user-info') {
    interaction.reply(
      'Your username: ' +
      interaction.user.username +
      '\nYour ID: ' +
      interaction.user.id
    );
  } else if (commandName === 'remindme') {
    const time = interaction.options.getInteger('minutes');

    interaction.reply(
      `Reminder for ${userMention(interaction.user.id)} created, ${time} minutes.`
    );

    setTimeout(() => {
      interaction.followUp(
        `Come back to work ${userMention(interaction.user.id)}.`
      );
    }, time! * 60 * 1000);
  } else if (commandName === 'tasks') {
    const tasks = await prisma.task.findMany({
      where: {
        userId: interaction.user.id
      }
    });

    let data = `### Your tasks ${userMention(interaction.user.id)}\n`;

    // data += '----------------------------------------------------\n';

    tasks.forEach((item, idx) => {
      data += ` ${idx + 1}. ${item.content}` + "\n";
    })

    interaction.reply(data);

  }

  else if (commandName === 'add-task') {
    const taskName = interaction.options.getString('name');


    if (!taskName) {
      interaction.reply(`Task "${taskName}" has been not created, add task name.`);
      return;
    }

    await prisma.task.create({
      data: {
        userId: interaction.user.id,
        content: taskName
      }
    });

    interaction.reply(`Task "${taskName}" has been created.`);
  }

  else if (commandName === 'remove-task') {
    const taskId = interaction.options.getInteger('id');

    const tasks = await prisma.task.findMany({
      where: {
        userId: interaction.user.id
      }
    });


    if (!taskId) {
      interaction.reply(`Task "${taskId}" has been not deleted, add task od.`);
      return;
    }

    try {
      await prisma.task.delete({
        where: {
          id: tasks[taskId - 1].id
        }
      })
    } catch (error) {
      console.log(error);
      interaction.reply("Something went wrong");
      return;
    }



    interaction.reply(`Task "${taskId}" has been deleted.`);
  }

});

// Log in to Discord with your client's token
client.login(env.DISCORD_TOKEN);
