import {
  DiscordjsError,
  DiscordjsErrorCodes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import { env, rest } from '~/container';
import { errorHelper } from '~/helpers/error-helper';
import { logHelper } from '~/helpers/log-helper';

export const reloadSlashCommandsHandler = async (commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[]) => {
  try {
    logHelper.info(`Started refreshing ${commandsData.length} application (/) commands.`);
    if (!env.discordApplicationId) throw new DiscordjsError(DiscordjsErrorCodes.ClientNotReady);

    const data = await rest.put(Routes.applicationCommands(env.discordApplicationId), { body: commandsData });

    logHelper.debug(JSON.stringify(data));
    logHelper.info(`Successfully reloaded ${commandsData.length} application (/) commands.`);
  } catch (err) {
    errorHelper('deployCommands', err);
  }
};
