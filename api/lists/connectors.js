import Mongoose from 'mongoose';
import { DB_URL } from '../globals';
Mongoose.Promise = global.Promise;

Mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const ListSchema = Mongoose.Schema({
    name: String,
});

export const List = Mongoose.model('List', ListSchema, 'lists');
