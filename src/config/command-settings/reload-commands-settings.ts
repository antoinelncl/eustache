import { PermissionFlagsBits } from 'discord.js';
import { CommandSettings } from '~/types/command';

export const reloadCommandSettings: CommandSettings = {
  name: 'reload-commands',
  description: 'A command to reload new commands on the repo, without running the script manually',
  isDmCommand: true,
  defaultMemberPermission: PermissionFlagsBits.Administrator,
  errorContext: 'reloadCommandsSlashCommand',
};
