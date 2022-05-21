import express, { Request, Response, Handler } from 'express';
import * as messageModel from '../model/message';
const { isAuthenticated } = require('../middlewares');
import { Message } from '../types';


const messageRouter = express.Router();
messageRouter.get('/', isAuthenticated, async (req, res, next) =>{

    const { userId } = req.body;

    if(userId != undefined){
        messageModel.getLatestFiveMessagesOfFriend(userId,(err: Error, messages: Message[]) => {
            if (err) {
                res.status(500).json({ status: 'error', errorMessage: err.message });
            } else {
                res.status(200).json(messages);
            }
        });
    }
    else {
        messageModel.getLatestFiveMessages((err: Error, messages: Message[]) => {
            if (err) {
                res.status(500).json({status: 'error', errorMessage: err.message});
            } else {
                res.status(200).json(messages);
            }
        });
    }
});

messageRouter.post('/', isAuthenticated, async (req, res, next) => {
    const authorId = req.body.userId
    const message = req.body.message

    messageModel.addMessage(authorId, message, (error: Error, message: String) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(200).json({ status: 'success', message });
        }
    });
});

export { messageRouter };
