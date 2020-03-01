import { List } from './connectors';
import { ToDo } from '../to-dos/connectors';

export const resolvers = {
    Query: {
        lists: async _ => {
            const listsWithoutToDos = await List.find();
            const listsWithToDos = [];
            for (let list of listsWithoutToDos) {
                list.toDos = await ToDo.find({ listId: list._id });
                listsWithToDos.push(list);
            }
            return listsWithToDos;
        },
    },
    Mutation: {
        createList: async (_, { newList }) => {
            let createdList = await List.create(newList);

            if (createdList) {
                return {
                    status: 'done',
                    list: createdList,
                };
            }

            return {
                status: 'error',
                list: null,
            };
        },
        updateList: async (_, { _id, updatedList }) => {
            let currentList = await List.findOne({ _id: _id });
            let listWithNewName = await List.findOne({ name: updatedList.name });

            if (!currentList) {
                return {
                    status: 'list_not_found',
                    list: null,
                };
            }

            if (currentList.name === updatedList.name) {
                return {
                    status: 'no_change',
                    list: currentList,
                };
            }

            if (listWithNewName) {
                return {
                    status: 'name_in_use',
                    list: null,
                };
            }

            if (await List.update({ _id: _id }, updatedList)) {
                return {
                    status: 'done',
                    list: await List.findOne({ name: updatedList.name }),
                };
            }

            return {
                status: 'error',
                list: null,
            };
        },
        deleteList: async (_, { _id }) => {
            // no error here, no harm done if to-dos persist
            await ToDo.remove({ listId: _id });

            if (await List.deleteOne({ _id: _id })) {
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
