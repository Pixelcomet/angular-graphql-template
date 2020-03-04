import { Component, OnInit } from '@angular/core';
import { List } from '../interfaces/List';
import { ListsService } from '../lists.service';
import { GlobalsService } from '../globals.service';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
    /** state variable to store an array containing all lists that are stored on
     * the server */
    lists: List[];

    constructor(
        private listsService: ListsService,
        private globalsService: GlobalsService
    ) {}

    async ngOnInit() {
        // firstly, load all lists from the server
        await this.update();

        // subscribe to the event emitter that emits an even whenever a to do is
        // added or removed
        this.globalsService.updateToDosEmitter.subscribe(async () => {
            // get the lists with their current to dos (updated by other
            // components/services)
            let updatedLists = await this.listsService.lists();

            // for each lists, update the to dos, but don't update the lists
            // themselves, this would cause all the accordion cards to close
            updatedLists.forEach((list, i) => {
                this.lists[i].toDos = list.toDos;
            });
        });

        // update when the emitter is fired
        this.globalsService.updateListsEmitter.subscribe(async () => {
            await this.update();
        });
    }
    /**
     * update all lists (push to server)
     */
    async update() {
        this.lists = await this.listsService.lists();
    }

    // create a new list on the server, then pull the changes
    async newList() {
        await this.listsService.createList({ name: 'Neue Liste' });
        await this.update();
    }
}
