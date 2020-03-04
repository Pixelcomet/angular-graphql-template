import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';

import { schema } from './global-schema';

const PORT = 4000;
// create a new express server instance, it is used to receive and process requests
const server = express();

// restrict to origin port for safety
server.use('*', cors({ origin: 'http://localhost:4200' }));

// all requests are received over the '/' route, in the real world, you'd
// probably want to use some versioned endpoint like '/api/v1'
server.use(
    '/',
    bodyParser.json(),
    graphqlExpress({
        schema,
    })
);

// start the server listen on the specified port
server.listen(PORT, () => console.log(`GraphQL Server is now running on localhost:${PORT}`));
