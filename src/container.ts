import { Client } from 'discord.js';
import { clientOptions } from '~/config/clientOptions';
import { EnvVarHelper } from '~/helpers/envHelper';

// common
export const env = new EnvVarHelper(
  process.env.SENTRY_DSN,
  process.env.DISCORD_TOKEN,
  process.env.DISCORD_APPLICATION_ID,
);

// discord.js
export const client = new Client(clientOptions);
