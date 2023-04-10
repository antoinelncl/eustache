import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { Command } from '~/types/command';

export class CommandsHelper {
  public commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

  constructor(commands: Command[]) {
    for (const command of commands) {
      this.commandsData.push(command.data.toJSON());
    }
  }
}
