import { Chat } from '@prisma/client';
import express, { Request, Response, Handler } from 'express';
import * as chatModel from '../model/chat';
const { isAuthenticated } = require('../middlewares');
import { Message } from '../types';


const chatRouter = express.Router();

chatRouter.get('/all/:userId/:friendId', isAuthenticated, async (req, res, next) => {
    const userId = +req.params.userId
    const friendId = +req.params.friendId
    chatModel.getAllChatMessagesFromFriend(userId,friendId, (error: Error, chat: Chat[]) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({ status: 'success', chat });
        }
    });
});

chatRouter.post('/addChatMessage', isAuthenticated, async (req, res, next) => {
    const userId = req.body.userId
    const friendId = req.body.friendId
    const message = req.body.message

    chatModel.addChatMessage(userId, friendId, message, (error: Error, message: String) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({ status: 'success', message });
        }
    });
});

export { chatRouter };
