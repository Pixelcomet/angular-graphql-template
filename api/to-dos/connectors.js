import Mongoose from 'mongoose';
import { DB_URL } from '../globals';
Mongoose.Promise = global.Promise;

Mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const ToDoSchema = Mongoose.Schema({
    listId: String,
    title: String,
    done: Boolean,
});

export const ToDo = Mongoose.model('ToDo', ToDoSchema, 'ToDos');
