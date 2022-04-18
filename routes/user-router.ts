/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *              description: User's name.
 *            messages:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                    description: Course name
 *                  description:
 *                    type: string
 *                    description: Course description
 *                  phase:
 *                    type: number
 *                    description: The phase within the education path
 * 
 *      LecturerInput:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Lecturer's name.
 *            courses:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 */
import express, { Request, Response, Handler } from 'express';
import * as userModel from '../model/user';
import { User } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users and a list of their friends and messages.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', (req: Request, res: Response) => {
    userModel.getUsers((err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});


/**
 * @swagger
 * /users/status:
 *   put:
 *      summary: Change the status of a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LecturerInput'
 *      responses:
 *         200:
 *            description: The ID and status of the updated user
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
userRouter.put('/status', (req: Request, res: Response) => {
    const userId = req.body['id']
    const newStatus = req.body['status']
    userModel.changeStatus(newStatus, userId, (error: Error, userId: number) => {
        if (error) {
            res.status(404).json({ status: 'error', errorMessage: "User doesn't exist" });
        } else {
            res.status(200).json({ status: 'success', userId });
        }
    });
});

userRouter.put('/friend', (req: Request, res: Response) => {
    const userId = req.body['id']
    const friendId = req.body['friendId']

    userModel.addFriend(userId, friendId, (error: Error, userId: number) => {
        if (error) {
            res.status(404).json({ status: 'error', errorMessage: error.message});
        } else {
            res.status(200).json({ status: 'success', userId });
        }
    });
});

userRouter.get('/friends/:userId', (req: Request, res: Response) => {
    const{ userId } = req.params;
    userModel.getFriends(+userId, (err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});



// /**
//  * @swagger
//  * /lecturers/{id}:
//  *   get:
//  *      summary: Get a lecturer by ID
//  *      responses:
//  *         200:
//  *           description: A lecturer
//  *           content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/Lecturer'
//  *      parameters:
//  *        - name: id
//  *          in: path
//  *          description: Lecturer ID
//  *          required: true
//  *          schema:
//  *            type: integer
//  *            format: int64
//  */
// lecturerRouter.get('/:id', (req: Request, res: Response) => {
//     const lecturerId = parseInt(req.params.id);
//     lecturerModel.getLecturer(lecturerId, (error: Error, lecturer: Lecturer) => {
//         if (error) {
//             res.status(500).json({ status: 'error', errorMessage: error.message });
//         } else {
//             res.status(200).json(lecturer);
//         }
//     });
// });

// /**
//  * @swagger
//  * /lecturers:
//  *   post:
//  *      summary: Add a lecturer
//  *      requestBody:
//  *        required: true
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/LecturerInput'
//  *      responses:
//  *         200:
//  *            description: The ID of the new Lecturer
//  *            content:
//  *              application/json:
//  *                schema:
//  *                  type: number
//  *                  description: Database ID
//  */
// lecturerRouter.post('/', (req: Request, res: Response) => {
//     const lecturer = <Lecturer>req.body;
//     lecturerModel.addLecturer(lecturer, (error: Error, lecturerId: number) => {
//         if (error) {
//             res.status(500).json({ status: 'error', errorMessage: error.message });
//         } else {
//             res.status(200).json({ status: 'success', lecturerId });
//         }
//     });
// });

// /**
//  * @swagger
//  * /lecturers/{id}:
//  *   delete:
//  *      summary: Delete a lecturer by ID
//  *      responses:
//  *         200:
//  *            description: Delete succesful
//  *      parameters:
//  *        - name: id
//  *          in: path
//  *          description: Lecturer ID
//  *          required: true
//  *          schema:
//  *            type: integer
//  *            format: int64
//  */
// lecturerRouter.delete('/:id', (req: Request, res: Response) => {
//     const lecturerId = parseInt(req.params.id);
//     lecturerModel.deleteLecturer(lecturerId, (error: Error) => {
//         if (error) {
//             res.status(500).json({ status: 'error', errorMessage: error.message });
//         } else {
//             res.status(200).json({ status: 'success' });
//         }
//     });
// });

export { userRouter };
    function lecturer(lecturer: any, arg1: (error: Error, userId: number) => void) {
        throw new Error('Function not implemented.');
    }

