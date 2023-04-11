import { CommandSettings } from '~/types/command';

export const helloSettings: CommandSettings = {
  name: 'hello',
  description: 'Say hello to Eustache and he will reply back',
  isDmCommand: true,
  errorContext: 'helloSlashCommand',
};
