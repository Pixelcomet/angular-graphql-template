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

    async lists(): Promise<List[]> {
        interface Data {
            lists: List[];
        }

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

        const resp = await this.apollo.watchQuery({ query: query }).result();
        const data = resp.data as Data;

        return data.lists;
    }

    async createList(newList: List): Promise<List> {
        interface Data {
            createList: ListStatusReturn;
        }

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

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.createList;

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

    async updateList(updatedList: List): Promise<List> {
        interface Data {
            updateList: ListStatusReturn;
        }

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

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.updateList;

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

    async deleteList(_id: String): Promise<boolean> {
        interface Data {
            deleteList: ListStatusReturn;
        }

        const mutation = gql`
            mutation {
                deleteList(_id: "${_id}") {
                    status
                }
            }
        `;

        const resp = await this.apollo
            .mutate({ mutation: mutation })
            .toPromise();
        const data = resp.data as Data;

        const statusReturn = data.deleteList;

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
