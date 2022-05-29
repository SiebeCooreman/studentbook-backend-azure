# Getting Started with our Prisma Backend

## **Prerequisites**

`Prisma`

Prisma is an ORM for Node, MySQL and Typescript. It converts a schema.prisma model-file to a migration that is plain SQL. Querying the database works a little differently, too.
We use Prisma queries to query the database. It returns data in a JSON format, so there is no need for a mapper. It also automatically generates the types for every model.

Steps to perform to set the prisma database up will be provided later in this guide.


`Prisma and JWT`

For authentication we make use of JWT Bearer tokens. Mr. Pieck told us about this in the beginning of the semester and so we decided to learn how to make use of it. This also changes our **.env** file a little bit.

`Contents of the dotenv file`

To get this repo up and running, you'll need to create a **.env** file in you root project directory (on the same level as .gitignore). The contents should look like this:

```
APP_PORT=3000
DB_HOST=localhost
JWT_ACCESS_SECRET=SECRET123
JWT_REFRESH_SECRET=ANOTHER_SECRET123
DATABASE_URL="mysql://root:t@127.0.0.1:3306/studentbook"
```

Replace the connection details with the ones from your server. **root** is the username, **t** is the password that we used.

## **Starting the demo application**

Run the following commands in a terminal (project root folder) to install all required node packages en get the server up and running 
*(make sure the .env file is created with correct credentials!):*

```
> npm install

> npx prisma migrate dev --name init

> npm start
```

This will start an express server on [http://localhost:3000](http://localhost:3000).


## **Swagger**

Last but not least: we handled our swagger a little differently.
You can access the swagger on the regular link (http://localhost:3000/api-docs). 
Authentication is done with tokens. Swagger handles this very conveniently.

Steps to perform:

1. Go to the Swagger link.
2. Open the register request and create your desired user.
3. Copy the access-token that was sent back in the response.
4. On the Swagger page, scroll to the top. Click on the little "authorize" lock and paste the access token in there.
5. If you ever have a connection timeout, creating a new user is NOT mandatory. Just use the login request to retrieve a new access-token.
6. Done. You can now use the Swagger to send any request you wish.


## **TROUBLESHOOTING**

Please just hit us up on Teams if anything goes wrong during the evaluation of this repository.
It is extensive, but we worked very hard on it would be a real bummer to lose a point here and there because the documentation was insufficient. Good luck!