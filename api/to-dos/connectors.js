import Mongoose from 'mongoose';
import { DB_URL } from '../globals';
Mongoose.Promise = global.Promise;

Mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// create the schema(s) to use in the resolvers for this part of the api
const ToDoSchema = Mongoose.Schema({
    listId: String,
    title: String,
    done: Boolean,
});

// create a model for each schema and export it for further use
export const ToDo = Mongoose.model('ToDo', ToDoSchema, 'ToDos');
