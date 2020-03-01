import { ToDo } from './connectors';
import { List } from '../lists/connectors';

export const resolvers = {
    Query: {
        toDos: async _ => {
            return await ToDo.find();
        },
    },
    Mutation: {
        createToDo: async (_, { inListWithId: listId, toDo: newToDo }) => {
            let list = await List.findOne({ _id: listId });
            if (!list) {
                return {
                    status: 'non_existing_list',
                    toDo: null,
                };
            }

            const createdToDo = await ToDo.create({
                listId,
                title: newToDo.title,
                done: false,
            });

            if (createdToDo) {
                return {
                    status: 'done',
                    toDo: createdToDo,
                };
            }

            return {
                status: 'error',
                toDo: null,
            };
        },
        updateToDo: async (_, { _id, updatedToDo }) => {
            let toDo = await ToDo.findOne({ _id: _id });
            if (!toDo) {
                return {
                    status: 'non_existing_to_do',
                    toDo: null,
                };
            }

            if (await ToDo.updateOne({ _id: _id }, updatedToDo)) {
                return {
                    status: 'done',
                    toDo: await ToDo.findOne({ _id: _id }),
                };
            }

            return {
                status: 'error',
                toDo: null,
            };
        },
        deleteToDo: async (_, { _id }) => {
            if (await ToDo.deleteOne({ _id: _id })) {
                return {
                    status: 'done',
                };
            }

            return {
                status: 'error',
            };
        },
    },
};
