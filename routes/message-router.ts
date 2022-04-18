/**
 * @swagger
 *   components:
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
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
 *                  name:
 *                    type: string
 *                    description: Course name
 *                  description:
 *                    type: string
 *                    description: Course description
 *                  phase:
 *                    type: number
 *                    description: The phase within the education path
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
 import * as messageModel from '../model/message';
 import { Message } from '../types';
 
 const messageRouter = express.Router();
 
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
 messageRouter.get('/', (req: Request, res: Response) => {
     messageModel.getLatestFiveMessages((err: Error, messages: Message[]) => {
         if (err) {
             res.status(500).json({ status: 'error', errorMessage: err.message });
         } else {
             res.status(200).json(messages);
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
 
 export { messageRouter };
 