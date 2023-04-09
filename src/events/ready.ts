import { Client, Events } from 'discord.js';
import { logHelper } from '~/helpers/logHelper';
import { Event } from '~/types/event';

export const ready: Event = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    if (!client.user || !client.application) process.exit(1);
    logHelper.debug(JSON.stringify(client));
    logHelper.info(`${client.user.username} is ready.`);
  },
};
