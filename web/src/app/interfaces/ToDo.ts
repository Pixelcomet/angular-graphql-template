export interface ToDo {
    _id?: string;
    listId?: string;
    title: string;
    done?: boolean;
}
export interface ToDoStatusReturn {
    status: string;
    toDo: ToDo;
}
