/** interface for to dos */
export interface ToDo {
    /** mongodb id */
    _id?: string;
    /** reference to the containing list */
    listId?: string;
    /** state of the "done" indicator in the UI */
    done?: boolean;
    /** text that will be shown next to the "done indicator" */
    title: string;
}

/** interface for the data structure returned by the api */
export interface ToDoStatusReturn {
    /** can include an error or "done" when everything is fine */
    status: string;
    /** contains the to do, when no error was encountered */
    toDo: ToDo;
}
