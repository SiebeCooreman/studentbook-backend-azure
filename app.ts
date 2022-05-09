import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './routes/user-router';
import { messageRouter } from './routes/message-router';
import authRouter from "./routes/auth-routes";
import { friendsRouter } from "./routes/friends-router";

const app = express();
dotenv.config();

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: 'MySQL Registration Swagger API',
        version: '1.0.0',
        description: 'Endpoints to test the user registration routes',
    },
    "securitySchemes": {
        "Bearer": {
            "in": "header",
            "name": "jwt",
            "type": "http",
            "scheme": "bearer"

        },
        "basicAuth": {
            "type": "http",
            "scheme": "basic"
        }
    },
    security: [ { bearerAuth: [] } ],

};

const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['api/*.yaml'],
    // apis: ['./routes/*.ts'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter, authRouter);
app.use('/friends', friendsRouter);
app.use("/messages", messageRouter)

app.get('/status', (req, res) => {
    res.json({ message: 'Backend is running...' });
});

app.get('/', (req, res) => {
    return res.status(200).send();
});
const auth = require('./routes/auth-routes');


app.use('/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}.`);
});
