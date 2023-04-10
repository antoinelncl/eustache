import { CommandInteraction, CacheType, SlashCommandBuilder } from 'discord.js';
import { reloadCommandSettings as settings } from '~/config/command-settings';
import { commandsHelper } from '~/container';
import { reloadSlashCommandsHandler } from '~/handlers/reload-commands';
import { errorHelper } from '~/helpers/error-helper';
import { Command } from '~/types/command';

export const reloadCommands: Command = {
  data: new SlashCommandBuilder()
    .setName(settings.name)
    .setDescription(settings.description)
    .setDMPermission(settings.isDmCommand)
    .setDefaultMemberPermissions(settings.defaultMemberPermission),
  run: async function (interaction: CommandInteraction<CacheType>): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    try {
      await reloadSlashCommandsHandler(commandsHelper.commandsData);
      await interaction.reply(`Successfuly reloaded ${commandsHelper.commandsData.length} commands.`);
    } catch (err) {
      errorHelper(settings.errorContext, err);
    }
  },
};
