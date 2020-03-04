import { mergeSchemas } from 'graphql-tools';

// import the schemas used for the api, make sure to give them different names
import { schema as listsSchema } from './lists/schema';
import { schema as toDoSchema } from './to-dos/schema';

// merge the schemas in order to make them accessible on just one endpoint (more
// practical in my experience, you can also split the endpoints to different
// routes eg. /api/images; /api/users, etc.)
export const schema = mergeSchemas({
    schemas: [listsSchema, toDoSchema],
});
