import mongo from './mongo';
import server from './server';
import { startStandaloneServer } from '@apollo/server/standalone';

import PostModel from './model/Post';
import UserModel from './model/User';

mongo.connect();

const PORT = process.env.PORT || 4000;
// const HOST = 'localhost'

startStandaloneServer(server, {
    context: async ({ req }) => ({ 
        token: req.headers.token,
        PostModel: PostModel,
        UserModel: UserModel,
    }),
    listen: { port: PORT },
}).then(({url}) => {
    console.log(`Apollo server is up on port ${PORT}`);
});
