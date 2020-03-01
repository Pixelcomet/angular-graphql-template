import { Component, OnInit, Input } from '@angular/core';
import { List } from '../interfaces/List';
import { ListsService } from '../lists.service';
import { ToDosService } from '../to-dos.service';
import { GlobalsService } from '../globals.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @Input() list: List;

    listOpen = false;

    constructor(
        private listsService: ListsService,
        private toDosService: ToDosService,
        private globalsService: GlobalsService
    ) {}

    ngOnInit() {}

    updateList() {
        this.listsService.updateList(this.list);
    }

    async newToDo() {
        await this.toDosService.createToDo(this.list._id, {
            title: 'Neues To Do',
            done: false
        });

        this.globalsService.updateToDosEmitter.emit();
    }

    async deleteList() {
        await this.listsService.deleteList(this.list._id);
        this.globalsService.updateListsEmitter.emit();
    }
}
