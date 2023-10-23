import { SlashCommandBuilder, userMention } from 'discord.js';
import { SlashCommand } from '../../types';

export const command: SlashCommand = {
    data: new SlashCommandBuilder()
      .setName("remindme")
      .setDescription("Reminds user in X minutes.")
      .addIntegerOption((option) =>
      option
        .setName('minutes')
        .setDescription('Number of minutes.')
        .setRequired(true)
    ),
    async execute(interaction) {
      const { options, user } = interaction;

      const minutes = options.getInteger('minutes');

      interaction.reply({
        content: userMention(user.id),
        embeds: [
          {
            title: `Reminder for ${user.username}`,
            description: `We'll remind you in ${minutes}m.`,
            thumbnail: {
                url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Bp9l_W837U9L3NBij9ZUgQHaEo%26pid%3DApi&f=1&ipt=9537300394200934b27378bc9a7c3a007a986fd2c933c76c993ca142c5834790&ipo=images",
            },
            color: 12321,
            author: {
                name: "aqua",
                icon_url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Bp9l_W837U9L3NBij9ZUgQHaEo%26pid%3DApi&f=1&ipt=9537300394200934b27378bc9a7c3a007a986fd2c933c76c993ca142c5834790&ipo=images"
            }
          },
        ],
      });

      setTimeout(() => {
        interaction.followUp(
          `Come back to work ${userMention(interaction.user.id)}.`
        );
      }, minutes! * 60 * 1000);
    }
}