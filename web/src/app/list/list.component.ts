import { Component, Input } from '@angular/core';
import { List } from '../interfaces/List';
import { ListsService } from '../lists.service';
import { ToDosService } from '../to-dos.service';
import { GlobalsService } from '../globals.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    /** input that catches arguments wrapped in [list]="object" inside the
     * template code (html) */
    @Input() list: List;

    /** state of the accordion-card containing the list */
    listOpen = false;

    constructor(
        private listsService: ListsService,
        private toDosService: ToDosService,
        private globalsService: GlobalsService
    ) {}
    /**
     * update the server side list (push changes)
     */
    updateList() {
        this.listsService.updateList(this.list);
    }

    /**
     * add a new to-do to the list
     */
    async newToDo() {
        await this.toDosService.createToDo(this.list._id, {
            title: 'New to-do',
            done: false
        });

        // emit an event that tells the lists component to update all to-dos in
        // all lists this could be done more efficiently by providing the _id of
        // the list that should be updated but for demonstration purposes, this
        // shall suffice
        this.globalsService.updateToDosEmitter.emit();
    }

    /**
     * delete the list
     */
    async deleteList() {
        await this.listsService.deleteList(this.list._id);
        // after deletion, tell the lists component to refresh all lists, this
        // will propagate through the entire app and remove all components and
        // references based on this list
        this.globalsService.updateListsEmitter.emit();
    }
}
