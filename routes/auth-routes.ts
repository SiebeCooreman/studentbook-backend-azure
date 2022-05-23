import {changeStatus} from "../model/user";
import * as userModel from "../model/user";
const axios = require("axios");
const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { hashToken } = require('../utils/hashToken');

const { generateTokens } = require('../Utils/jwt');
const {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
} = require('../model/auth');
// const jwt = require('jsonwebtoken');

const authRouter = express.Router();
const {
    findUserByEmail,
    createUserByEmailAndPassword,
    findUserById,
} = require('../model/user');

authRouter.post('/register', async (req, res, next) => {
    try {
        const {name , status, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('No name was provide');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400);
            throw new Error('Email already in use.');
        }

        const user = await createUserByEmailAndPassword({ name, status, email, password});
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id});


        res.json({
            accessToken,
            refreshToken,
            status : user.status,
            id: user.id
        });
    } catch (err) {
        next(err);
    }
});

// add bcrypt at the top of the file.
const bcrypt = require('bcrypt');

authRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);


        if (!existingUser) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id, username : existingUser.email, status : existingUser.status});
        console.log(accessToken)
        userModel.changeStatus(true, "online", existingUser.id, (error: Error, userId: number) => {});
        res.json({
            accessToken,
            refreshToken,
            status : existingUser.status,
            id: existingUser.id
        });
    } catch (err) {
        next(err);
    }
});


authRouter.post('/logout', async (req, res, next) => {
    try {
        const { userId } = req.body;
        userModel.changeStatus(false, "offline", userId, (error: Error, userId: number) => {});
        res.json({ "success" : "logged out"});
    } catch (err) {
        next(err);
    }
});

authRouter.post('/refreshToken', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        next(err);
    }
});

authRouter.post('/revokeRefreshTokens', async (req, res, next) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (err) {
            next(err);
    }
});

export = authRouter;
