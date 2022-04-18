import { Type } from '@prisma/client';
import { Message } from '../types';
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


export {getLatestFiveMessages};
