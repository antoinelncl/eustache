import { PrismaClient } from '@prisma/client';
import { SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption, TextChannel } from 'discord.js';
import { askSettings as settings } from '~/config/command-settings/ask-settings';
import { chatCompletion } from '~/handlers/chat-completion';
import { errorHelper } from '~/helpers/error-helper';
import { logHelper } from '~/helpers/log-helper';
import { Command } from '~/types/command';

export const ask: Command = {
  data: new SlashCommandBuilder()
    .setName(settings.name)
    .setDescription(settings.description)
    .addStringOption(
      new SlashCommandStringOption()
        .setName(settings.options ? settings.options.prompt.name : '')
        .setDescription(settings.options ? settings.options.prompt.description : '')
        .setRequired(settings.options ? settings.options.prompt.required : true),
    )
    .addBooleanOption(
      new SlashCommandBooleanOption()
        .setName('thread')
        .setDescription('should open a thread discussion')
        .setRequired(false),
    )
    .setDMPermission(settings.isDmCommand),
  run: async function (interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const prisma = new PrismaClient();
    const channel = interaction.channel as TextChannel;
    interaction.deferReply();
    try {
      const prompt = interaction.options.getString('prompt');
      if (prompt) {
        if (interaction.options.getBoolean('thread')) {
          const thread = await channel?.threads.create({
            name: prompt,
          });
          const response = await chatCompletion(prompt);
          await thread.send(`${response}`);
          await interaction.editReply('Thread created');
          const conversation = await prisma.conversation.create({
            data: {
              authorId: interaction.member ? interaction.member.user.id : '',
              threadId: thread.id,
              messages: {
                create: [
                  {
                    content: prompt,
                    role: 'user',
                  },
                  {
                    content: response,
                    role: 'assistant',
                  },
                ],
              },
            },
          });
          logHelper.debug(JSON.stringify(conversation));
        } else {
          interaction.editReply(`${await chatCompletion(prompt)}`);
        }
      } else {
        await interaction.editReply("Couldn't find prompt");
        throw Error(`Couldn't find prompt or channel: ${prompt} ${channel}`);
      }
    } catch (err) {
      errorHelper(settings.errorContext, err);
    }
  },
};
