import { ToDo } from './ToDo';

export interface List {
    _id?: string;
    name: string;
    toDos?: ToDo[];
}

export interface ListStatusReturn {
    status: string;
    list: List;
}
