import express, { Request, Response, Handler } from 'express';
import * as userModel from '../model/user';
import { User } from '../types';

const { isAuthenticated } = require('../middlewares');
const userRouter = express.Router();

userRouter.get('/',  isAuthenticated, async (req, res, next) => {
     userModel.getUsers((err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({status: 'error', errorMessage: err.message});
        } else {
            res.status(200).json(users);
        }
    }).then(r => r);
});

userRouter.put('/status',  isAuthenticated, async (req, res, next) => {

    const userId = req.body.userId
    const newStatus = req.body.status

    userModel.changeStatus(newStatus, userId, (error: Error, userId: number) => {
        if (error) {
            res.status(404).json({ status: 'error', errorMessage: error });
        } else {
            res.status(200).json({ status: 'success', userId });
        }
    });

});

userRouter.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findUserById(userId);
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export { userRouter };
