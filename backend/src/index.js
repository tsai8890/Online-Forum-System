import mongo from './mongo';
import server from './server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import path from 'path'
import cors from 'cors';

import PostModel from './model/Post';
import UserModel from './model/User';

mongo.connect();

const PORT = process.env.PORT || 4000;
// const HOST = 'localhost'
const app = express();

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

const startServer = async () => {
    await server.start();
    app.use('/graphql', cors(), json(), expressMiddleware(server, {
        context: async ({ req }) => ({ 
            token: req.headers.token,
            PostModel: PostModel,
            UserModel: UserModel,
        }),
    }));
}

startServer();

app.listen({port: PORT}, () => {
    console.log(`Apollo server is up on port ${PORT}`)
});