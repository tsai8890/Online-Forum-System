import mongo from './mongo';
import server from './server';

mongo.connect();

const PORT = process.env.PORT || 4000;
const HOST = 'localhost'
server.listen(PORT, HOST, () => {
    console.log(`server is listening on ${HOST}:${PORT}`);
});