import { SlashCommandBuilder } from 'discord.js';
import { helloSettings as settings } from '~/config/commandSettings';
import { errorHelper } from '~/helpers/errorHelper';
import { Command } from '~/types/command';

export const hello: Command = {
  data: new SlashCommandBuilder()
    .setName(settings.name)
    .setDescription(settings.description)
    .setDMPermission(settings.isDmCommand),
  run: async function (interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    try {
      await interaction.reply(`Hello! ${interaction.member?.user.username}`);
    } catch (err) {
      errorHelper(settings.errorContext, err);
    }
  },
};
