import { Chat, Type, User } from '@prisma/client';
import { Message } from '../types';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: 'minimal' });

const getAllChatMessagesFromFriend = async (
    userId: Number,
    friendId: Number,
    onResult: (error: Error, messages: Message[]) => void
) => {
    try {
        const chat = await prisma.chat.findFirst({
            where: { users: { every: { id: { in: [userId, friendId] } } } },
        });
        const allChatMessagesByFriend = await prisma.message.findMany({
            where: {
                type: Type.Private,
                chatId: chat.id,
                OR: [{ authorId: userId }, { authorId: friendId }],
            },
            orderBy: {
                DateSent: 'desc',
            },
            take: 100,
        });
        onResult(null, allChatMessagesByFriend);
    } catch (error) {
        onResult(error, null);
    }
};

const sendChatMessage = async (
    userId: Number,
    friendId: Number,
    messageText: String,
    onResult: (error: Error, message: String) => void
) => {
    try {
        const chat = await prisma.chat.findFirst({
            where: {
                users: {
                    every: {
                        id: {
                            in: [userId, friendId],
                        },
                    },
                },
            },
        });

        const addChatMessage = await prisma.message.create({
            data: {
                text: messageText,
                author: { connect: { id: userId } },
                chat: { connect: { id: chat.id } },
                type: Type.Private,
            },
        });
        onResult(null, addChatMessage);
    } catch (error) {
        onResult(error, null);
    }
};

export {getAllChatMessagesFromFriend, sendChatMessage };
