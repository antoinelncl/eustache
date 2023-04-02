import { Client } from 'discord.js';

export default (client: Client) => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }
  });
};
