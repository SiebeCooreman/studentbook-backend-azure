import express, { Request, Response, Handler } from 'express';
import * as userModel from '../model/user';
import { User } from '../types';

const { isAuthenticated } = require('../middlewares');

const friendsRouter = express.Router();

friendsRouter.post('/', isAuthenticated, async (req, res, next) => {
    const {userId , friendsemail} = req.body;
    userModel.addFriend(userId, friendsemail, (error: Error, userId: number) => {
        if (error) {
            res.status(404).json({ status: 'error', errorMessage: error.message});
        } else {
            res.status(200).json({ status: 'success', userId });
        }
    });
});

friendsRouter.get('/',  isAuthenticated, async (req, res, next) => {
    const{ userId } = req.body;
    userModel.getFriends(+userId, (err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});
export { friendsRouter };
