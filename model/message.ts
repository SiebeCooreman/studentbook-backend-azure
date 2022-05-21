import { Type } from '@prisma/client';
import { Message } from '../types';
import { User } from '../types';
import * as userModel from '../model/user';
const { PrismaClient } = require('@prisma/client')
const { PrismaClientValidationError } = require('@prisma/client/runtime')
const prisma = new PrismaClient()

const getLatestFiveMessages = async (onResult: (error: Error, messages: Message[]) => void) => {
    try {
        const fiveMessages = await prisma.message.findMany({
            where: {
                type: Type.Public
            },
            orderBy: {
                DateSent: 'desc'
            },
            take: 5,
            include: {
                author: true
            }
        })
        onResult(null, fiveMessages);
    } catch (error) {
        onResult(error, null);
    }
};

const getLatestFiveMessagesOfFriend = async (userId: Number, onResult: (error: Error, messages: Message[]) => void) => {
    try {
        const friends = await prisma.user.findMany(
                        {where: {followedBy: {some: {id: userId}}}})

        const friendIds = friends.map (x => x.id)

        const fiveMessages = await prisma.message.findMany({
            where: {
                type: Type.Public,
                    authorId: {in: friendIds}
            },
            orderBy: {
                DateSent: 'desc'
            },
            take: 5,
            include: {
                author: true
            }
        })
        onResult(null, fiveMessages);
    } catch (error) {
        onResult(error, null);
    }
};

const addMessage = async (userId: Number, messageText: String,
    onResult: (error: Error, message: String) => void
) => {

    try {
        const addMessage =
        await prisma.message.create({
            data: {
                text: messageText,
                author: {connect: {id: userId}}
            }
        })
        onResult(null, addMessage);
    } catch (error) {
        onResult(error, null);
    }
};


export {getLatestFiveMessages, getLatestFiveMessagesOfFriend, addMessage};
