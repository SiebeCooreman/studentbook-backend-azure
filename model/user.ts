import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../types';
import { connectionPool } from '../database';
const { PrismaClient } = require('@prisma/client')
const { PrismaClientValidationError } = require('@prisma/client/runtime')
const prisma = new PrismaClient()

const getUsers = async (onResult: (error: Error, users: User[]) => void) => {
    try {
        const allUsers = await prisma.user.findMany()
        onResult(null, allUsers);
    } catch (error) {
        onResult(error, null);
    }
};


const getFriends = async (userId: Number, onResult: (error: Error, users: User[]) => void) => {
    try {
        const allUsers = await prisma.user.findMany(
            {where: {followedBy: {some: {id: userId}}}})
        onResult(null, allUsers);
    } catch (error) {
        onResult(error, null);
    }
};


const changeStatus = async (loggedin: boolean,
    newStatus: String, userId: Number,
    onResult: (error: Error, addedUserId: number) => void
) => {

    try {
        const updateStatusForUser =
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                status: newStatus,
                loggedin: loggedin
            },
        })
        onResult(null, updateStatusForUser);
    } catch (error) {
        onResult(error, null);
    }
};



const addFriend = async (userId : Number, friendsemail: Number, onResult: (error: Error, addedFriendId: number) => void) => {

    try {
        const addFriendToUser =
        await prisma.user.update({
            where: {id:userId },
            data: {
                following: {connect: {email: friendsemail}},
                followedBy: {connect: {email: friendsemail}}

        }})

        await prisma.chat.create({
            data: {
                users: { connect: [{ id: userId }, { email: friendsemail }] },
            },
        });


        onResult(null, addFriendToUser);
    } catch (error) {
        onResult(error, null);
    }
};


// part of login system

const bcrypt = require('bcrypt');
const { db } = require('../Utils/db');

async function findUserByEmail(email) {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

async function createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
        data: user,
    });

}

function findUserById(id) {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}

export { getUsers, changeStatus, addFriend, getFriends, findUserById, findUserByEmail, createUserByEmailAndPassword};
