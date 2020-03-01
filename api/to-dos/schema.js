import { makeExecutableSchema } from 'graphql-tools';
import { readFile } from '../modules/util';

import { resolvers } from './resolvers';

const typeDefs = readFile('../to-dos/schema.graphql');

export const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: [resolvers],
});
