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


const changeStatus = async (
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
                status: newStatus
            },
        })
        onResult(null, updateStatusForUser);
    } catch (error) {
        onResult(error, null);
    }
};



const addFriend = async (userId: Number, friendId,
    onResult: (error: Error, addedFriendId: number) => void
) => {

    try {
        const addFriendToUser = 
        await prisma.user.update({
            where: {id: userId},
            data: {
                following: {connect: {id: friendId}
            }
        }})
        onResult(null, addFriendToUser);
    } catch (error) {
        onResult(error, null);
    }
};


// const getLecturer = async (
//     lecturerId: number,
//     onResult: (error: Error, lecturer: Lecturer) => void
// ) => {
//     const query = `SELECT l.id AS lecturer_id, l.name AS lecturer_name, c.id AS course_id, c.name AS course_name, c.description AS course_description, c.phase AS course_phase
//   FROM lecturer AS l, course AS c, lecturer_course AS lc
//   WHERE l.id = ?
//   AND l.id = lc.lecturer_id
//   AND c.id = lc.course_id`;

//     try {
//         const [row] = await connectionPool.execute(query, [lecturerId]);
//         onResult(null, mapToLecturers(<RowDataPacket[]>row)[0]);
//     } catch (error) {
//         onResult(error, null);
//     }
// };

// const addLecturer = async (
//     lecturer: Lecturer,
//     onResult: (error: Error, addedLecturerId: number) => void
// ) => {
//     const lecturerInsert = 'INSERT INTO lecturer (name) VALUES (?)';
//     const lecturerCourseInsert =
//         'INSERT INTO lecturer_course (lecturer_id, course_id) VALUES (?, ?)';

//     const connection = await connectionPool.getConnection();

//     // Multiple queries are involved, so we execute them in a transaction to assure they will only get commited
//     // when all queries were succesful. Otherwise, all queries need to be rolled back.
//     await connection.beginTransaction();

//     try {
//         const [result] = await connection.execute(lecturerInsert, [lecturer.name]);
//         const addedLecturerId = (<ResultSetHeader>result).insertId;

//         // we can't use forEach, since it expects a synchronous function and doesn't wait for promises
//         for (const course of lecturer.courses) {
//             await connection.execute(lecturerCourseInsert, [addedLecturerId, course.id]);
//         }

//         await connection.commit();
//         onResult(null, addedLecturerId);
//     } catch (error) {
//         await connection.rollback();
//         onResult(error, null);
//     } finally {
//         await connection.release();
//     }
// };

// const deleteLecturer = async (lecturerId: number, onResult: (error: Error) => void) => {
//     const lecturerDelete = 'DELETE FROM lecturer WHERE ID = ?';
//     const lecturerCourseDelete = 'DELETE FROM lecturer_course WHERE lecturer_id = ?';

//     const connection = await connectionPool.getConnection();

//     await connection.beginTransaction();

//     try {
//         await connection.execute(lecturerCourseDelete, [lecturerId]);
//         await connection.execute(lecturerDelete, [lecturerId]);

//         await connection.commit();
//         onResult(null);
//     } catch (error) {
//         await connection.rollback();
//         onResult(error);
//     } finally {
//         await connection.release();
//     }
// };

export { getUsers, changeStatus, addFriend, getFriends };
