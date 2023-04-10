import { commandsHelper } from '~/container';
import { reloadSlashCommandsHandler } from '~/handlers/reload-commands';

reloadSlashCommandsHandler(commandsHelper.commandsData);
