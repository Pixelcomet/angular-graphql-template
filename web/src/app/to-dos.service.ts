import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ToDo, ToDoStatusReturn } from './interfaces/ToDo';
import { GlobalsService } from './globals.service';
import { UtilService } from './util.service';
@Injectable({
    providedIn: 'root'
})
export class ToDosService {
    constructor(
        private apollo: Apollo,
        private globalsService: GlobalsService,
        private utilService: UtilService
    ) {}

    async toDos(): Promise<ToDo[]> {
        interface Data {
            toDos: ToDo[];
        }

        const query = gql`
            {
                toDos {
                    _id
                    listId
                    title
                    done
                }
            }
        `;

        const resp = await this.apollo.watchQuery({ query: query }).result();
        const data = resp.data as Data;

        return data.toDos;
    }

    async createToDo(inListWithId: string, toDo: ToDo): Promise<ToDo> {
        interface Data {
            createToDo: ToDoStatusReturn;
        }

        const mutation = gql`
            mutation {
                createToDo(inListWithId: "${inListWithId}", toDo: {title: "${toDo.title}"}) {
                    status
                    toDo {
                        _id
                        title
                        done
                    }
                }
            }
        `;

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.createToDo;

        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit(
                    'To Do erstellt.'
                );
                return statusReturn.toDo;
            case 'non_existing_list':
                this.globalsService.snackBarEventEmitter.emit(
                    'Diese Liste exsistiert nicht (mehr).'
                );
                this.globalsService.updateListsEmitter.emit();
                return null;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unbekannter Fehler: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }

    async updateToDo(updatedToDo: ToDo): Promise<ToDo> {
        interface Data {
            updateToDo: ToDoStatusReturn;
        }

        const mutation = gql`
            mutation {
                updateToDo(_id: "${
                    updatedToDo._id
                }", updatedToDo: ${this.utilService.toGraphql(updatedToDo)}) {
                    status
                    toDo {
                        _id
                        title
                        done
                    }
                }
            }
        `;

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.updateToDo;

        switch (statusReturn.status) {
            case 'done':
                return statusReturn.toDo;
            case 'non_existing_to_do':
                this.globalsService.snackBarEventEmitter.emit(
                    'Das To Do existiert nicht (mehr).'
                );
                this.globalsService.updateListsEmitter.emit();
                return null;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unbekannter Fehler: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }

    async deleteToDo(_id: String): Promise<boolean> {
        interface Data {
            deleteToDo: ToDoStatusReturn;
        }

        const mutation = gql`
            mutation {
                deleteToDo(_id: "${_id}") {
                    status
                }
            }
        `;

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.deleteToDo;

        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit(
                    'To Do gelöscht.'
                );
                return true;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unbekannter Fehler: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }
}
