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

const getLatestFiveMessagesOfFriend = async (userId: Number, onResult: (error: Error, messages: Message[]) => void) => {
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

// const addMeal = async (title:string, userId: number, duration: string, numberOfPortions: string, price: string, picture:string, vegetarian:boolean=false) => {
//     const meal = await prisma.meal.create({
//         data: {
//           title: title,
//           duration: parseInt(duration),
//           price: parseFloat(price),
//           picture: picture,
//           user: {
//             connect: {
//                 id: userId,
//             },
//           },
//           vegetarian: vegetarian,
//         },
//         include: {
//           user: true,
//         },
//       })

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
