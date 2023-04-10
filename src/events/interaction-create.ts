import { ChatInputCommandInteraction, Events, Interaction } from 'discord.js';
import * as commands from '~/commands';
import { errorHelper } from '~/helpers/error-helper';
import { logHelper } from '~/helpers/log-helper';
import { Event } from '~/types/event';

export const interactionCreate: Event = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction): Promise<void> => {
    if (interaction.isChatInputCommand()) {
      await handleSlashCommand(interaction);
    }
  },
};

async function handleSlashCommand(interaction: ChatInputCommandInteraction) {
  try {
    const command = Object.entries(commands)
      .map((command) => command[1])
      .find((command) => command.data.name === interaction.commandName);

    if (!command) {
      interaction.followUp({ content: 'Command not found' });
      throw new Error('Command not found');
    }

    logHelper.debug(JSON.stringify(command));
    await command.run(interaction);
  } catch (err) {
    errorHelper(`${interaction.commandName}Command`, err);
  }
}
