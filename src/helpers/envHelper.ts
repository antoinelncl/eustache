import { init } from '@sentry/node';
import { DiscordjsError, DiscordjsErrorCodes } from 'discord.js';
import { errorHelper } from '~/helpers/errorHelper';

export class EnvVarHelper {
  public sentryDsn: string;
  public discordToken: string;
  public discordApplicationId: string;

  constructor(
    sentryDsn: string | undefined,
    discordToken: string | undefined,
    discordApplicationId: string | undefined,
  ) {
    try {
      if (!sentryDsn) throw new Error('Sentry DSN environement variable missing.');
      if (!discordToken) throw new DiscordjsError(DiscordjsErrorCodes.TokenMissing);
      if (!discordApplicationId) throw new Error('Application id of Eustache missing.');
    } catch (err) {
      errorHelper('envHelper', err);
      process.exit(1);
    }

    // Sentry
    this.sentryDsn = sentryDsn;
    init({
      dsn: this.sentryDsn,
      tracesSampleRate: 1.0,
    });

    this.discordToken = discordToken;
    this.discordApplicationId = discordApplicationId;
  }
}
