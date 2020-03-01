import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

import { schema } from './global-schema';

const PORT = 4000;
const server = express();

//restrict to origin port for safety
server.use('*', cors({ origin: 'http://localhost:4200' }));

server.use(
    '/',
    bodyParser.json(),
    graphqlExpress({
        schema,
    })
);

server.listen(PORT, () => console.log(`GraphQL Server is now running on localhost:${PORT}`));
