import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { List, ListStatusReturn } from './interfaces/List';
import { GlobalsService } from './globals.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    constructor(
        private apollo: Apollo,
        private globalsService: GlobalsService,
        private utilService: UtilService
    ) {}

    /**
     * @returns Promise
     *
     * retrieves all lists from the server
     */
    async lists(): Promise<List[]> {
        // this is how the returned object will look
        interface Data {
            lists: List[];
        }

        // this is the query that will be sent to the server, specifying the
        // responses structure
        const query = gql`
            {
                lists {
                    _id
                    name
                    toDos {
                        _id
                        title
                        done
                    }
                }
            }
        `;

        // send the request, wait for it to return data
        const resp = await this.apollo.watchQuery({ query: query }).result();
        // parse data and create a usable object
        const data = resp.data as Data;

        // return the lists
        return data.lists;
    }

    /**
     * @param  {List} newList
     * @returns Promise
     *
     * creates a list
     */
    async createList(newList: List): Promise<List> {
        // this is how the returned object will look
        interface Data {
            createList: ListStatusReturn;
        }

        // this is the mutation that will be sent to the server, specifying the
        // responses structure
        const mutation = gql`
            mutation {
                createList(newList: { name: "${newList.name}" }) {
                    status
                    list {
                        _id
                        name
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
        const statusReturn = data.createList;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit(
                    'Liste erstellt.'
                );
                return statusReturn.list;
            case 'list_name_exists':
                this.globalsService.snackBarEventEmitter.emit(
                    'Eine Liste mit diesem Namen existiert bereits.'
                );
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

    /**
     * @param  {List} updatedList
     * @returns Promise
     *
     * updates a list (push to server)
     */
    async updateList(updatedList: List): Promise<List> {
        // this is how the returned object will look
        interface Data {
            updateList: ListStatusReturn;
        }

        // this is the mutation that will be sent to the server, specifying the
        // responses structure
        const mutation = gql`
            mutation {
                updateList(_id: "${updatedList._id}", updatedList: {name: "${updatedList.name}"}) {
                    status
                    list {
                        _id
                        name
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
        const statusReturn = data.updateList;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                // dont print anythign out, would be annoying
                return statusReturn.list;
            case 'list_not_found':
                this.globalsService.snackBarEventEmitter.emit(
                    'Die Liste wurde in einer anderen Instanz gelöscht.'
                );
                this.globalsService.updateListsEmitter.emit();
                return null;
            case 'no_change':
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

    /**
     * @param  {String} _id
     * @returns Promise
     *
     * deletes a list
     */
    async deleteList(_id: String): Promise<boolean> {
        // this is how the returned object will look
        interface Data {
            deleteList: ListStatusReturn;
        }

        // this is the mutation that will be sent to the server, specifying the
        // responses structure
        const mutation = gql`
            mutation {
                deleteList(_id: "${_id}") {
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
        const statusReturn = data.deleteList;

        // match the return status and display a status update to the user
        switch (statusReturn.status) {
            case 'done':
                this.globalsService.snackBarEventEmitter.emit(
                    'Liste gelöscht.'
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
