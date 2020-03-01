import { mergeSchemas } from 'graphql-tools';

import { schema as listsSchema } from './lists/schema';
import { schema as toDoSchema } from './to-dos/schema';

export const schema = mergeSchemas({
    schemas: [listsSchema, toDoSchema],
});
