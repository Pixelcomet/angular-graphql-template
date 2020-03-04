import { ToDo } from './ToDo';

/** interface for the list itself */
export interface List {
    /** mongodb id */
    _id?: string;
    /** list name */
    name: string;
    /** array of to-dos */
    toDos?: ToDo[];
}

/** interface for the data structure returned by the api */
export interface ListStatusReturn {
    /** can include an error or "done" when everything is fine */
    status: string;
    /** contains the list, when no error was encountered */
    list: List;
}
