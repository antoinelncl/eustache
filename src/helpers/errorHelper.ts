import { captureException } from '@sentry/node';
import { logHelper } from '~/helpers/logHelper';

export const errorHelper = (context: string, err: unknown): void => {
  if (err instanceof Error) {
    logHelper.log('error', `There was an error in ${context}`);
    logHelper.log('error', JSON.stringify({ errorMessage: err.message, errorStack: err.stack }));

    // Sentry
    captureException(err);
  }
};
