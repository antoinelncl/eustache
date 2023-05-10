import { PrismaClient } from '@prisma/client';
import { Events, Message } from 'discord.js';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { client, threads } from '~/container';
import { chatCompletion } from '~/handlers/chat-completion';
import { Event } from '~/types/event';

export const messageCreate: Event = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message: Message): Promise<void> => {
    const threadIds = await Promise.resolve(threads);
    if (
      (!message.channel.isThread() && !threadIds.some((threadId) => message.channelId === threadId)) ||
      message.author === client.user
    ) {
      return;
    }
    const prisma = new PrismaClient();
    const messages = await prisma.message.findMany({ where: { Conversation: { threadId: message.channelId } } });
    const history: ChatCompletionRequestMessage[] = messages.map((message) => {
      return {
        role: message.role as ChatCompletionRequestMessageRoleEnum,
        content: message.content,
      };
    });
    const prompt = message.content;
    const response = await chatCompletion(prompt, history);
    await message.channel.send(response);

    await prisma.conversation.update({
      where: { threadId: message.channelId },
      data: {
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
  },
};
