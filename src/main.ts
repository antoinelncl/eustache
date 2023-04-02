import { Client } from 'discord.js';
import onReady from '~/events/onReady';

const client = new Client({
  intents: [],
});

onReady(client);

client.login(process.env.DISCORD_TOKEN);
