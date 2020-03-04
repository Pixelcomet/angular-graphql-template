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

    /**
     * @returns Promise
     *
     * retrieves all to-dos from the server
     */
    async toDos(): Promise<ToDo[]> {
        // this is how the returned object will look
        interface Data {
            toDos: ToDo[];
        }

        // this is the query that will be sent to the server, specifying the
        // responses structure
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

        // send the request, wait for it to return data
        const resp = await this.apollo.watchQuery({ query: query }).result();
        // parse data and create a usable object
        const data = resp.data as Data;

        // return the to-dos
        return data.toDos;
    }

    /**
     * @param  {string} inListWithId
     * @param  {ToDo} toDo
     * @returns Promise
     *
     * creates a new to-do on the server side
     */
    async createToDo(inListWithId: string, toDo: ToDo): Promise<ToDo> {
        // this is how the returned object will look
        interface Data {
            createToDo: ToDoStatusReturn;
        }

        // this is the mutation that will be sent to the server, specifying the
        // responses structure
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

        // send the request, wait for it to return data
        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        // parse data and create a usable object
        const data = resp.data as Data;

        // extract return value
        const statusReturn = data.createToDo;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit('Created to-do');
                return statusReturn.toDo;
            case 'non_existing_list':
                this.globalsService.snackBarEventEmitter.emit(
                    'List was deleted on server or in different instance'
                );
                this.globalsService.updateListsEmitter.emit();
                return null;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unknown Error: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }

    /**
     * @param  {ToDo} updatedToDo
     * @returns Promise
     *
     * updates a to-do (push to server)
     */
    async updateToDo(updatedToDo: ToDo): Promise<ToDo> {
        // this is how the returned object will look
        interface Data {
            updateToDo: ToDoStatusReturn;
        }

        // this is the mutation that will be sent to the server, specifying the
        // responses structure
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

        // send the request, wait for it to return data
        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();

        // parse data and create a usable object
        const data = resp.data as Data;

        // extract return value
        const statusReturn = data.updateToDo;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                return statusReturn.toDo;
            case 'non_existing_to_do':
                this.globalsService.snackBarEventEmitter.emit(
                    'to-do was deleted on server or in different instance.'
                );
                this.globalsService.updateListsEmitter.emit();
                return null;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unknown Error: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }

    /**
     * @param  {String} _id
     * @returns Promise
     *
     * deletes a to-do
     */
    async deleteToDo(_id: String): Promise<boolean> {
        // this is how the returned object will look
        interface Data {
            deleteToDo: ToDoStatusReturn;
        }
        // this is the mutation that will be sent to the server, specifying the
        // responses structure

        const mutation = gql`
            mutation {
                deleteToDo(_id: "${_id}") {
                    status
                }
            }
        `;

        // send the request, wait for it to return data
        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();

        // parse data and create a usable object
        const data = resp.data as Data;

        // extract return value
        const statusReturn = data.deleteToDo;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit('deleted to-do');
                return true;
            default:
                this.globalsService.snackBarEventEmitter.emit(
                    `Unknown Error: #${parseInt(
                        Math.ceil(Math.random() * 10000000).toString(),
                        16
                    )}`
                );
                break;
        }
    }
}
