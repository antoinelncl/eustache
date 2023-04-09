import {
  DiscordjsError,
  DiscordjsErrorCodes,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import * as commands from '~/commands';
import { env } from '~/container';
import { errorHelper } from '~/helpers/errorHelper';
import { logHelper } from '~/helpers/logHelper';

const rest = new REST({ version: '10' }).setToken(env.discordToken);
const commandsArray = Object.entries(commands).map((command) => command[1]);
const commandsData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

for (const command of commandsArray) {
  logHelper.info(`${command.data.name} loaded for push into discord API`);
  commandsData.push(command.data.toJSON());
}

(async () => {
  try {
    logHelper.info(`Started refreshing ${commandsArray.length} application (/) commands.`);
    if (!env.discordApplicationId) throw new DiscordjsError(DiscordjsErrorCodes.ClientNotReady);

    const data = await rest.put(Routes.applicationCommands(env.discordApplicationId), { body: commandsData });

    logHelper.debug(JSON.stringify(data));
    logHelper.info(`Successfully reloaded ${commandsArray.length} application (/) commands.`);
  } catch (err) {
    errorHelper('deployCommands', err);
  }
})();
