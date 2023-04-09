import { ApplicationCommandOptionType, CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  run: (interaction: CommandInteraction<CacheType>) => Promise<void>;
}

export interface CommandSettings {
  name: string;
  description: string;
  options?: CommandOptions[];
  subCommands?: SubCommands[];
  isDmCommand: boolean;
  errorContext: string;
}

export type CommandOptions = {
  type: ApplicationCommandOptionType;
  settings: CommandOptionsSettings;
};

export type CommandOptionsSettings = {
  name: string;
  description: string;
  required: boolean;
};

export type SubCommands = {
  name: string;
  description: string;
  options?: CommandOptions[];
};
