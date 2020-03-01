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
    lists: List[];

    constructor(
        private listsService: ListsService,
        private globalsService: GlobalsService
    ) {}

    async ngOnInit() {
        await this.update();

        // hint: do not ever do something like this in production
        this.globalsService.updateToDosEmitter.subscribe(async () => {
            let updatedLists = await this.listsService.lists();

            updatedLists.forEach((list, i) => {
                this.lists[i].toDos = list.toDos;
            });
        });

        this.globalsService.updateListsEmitter.subscribe(async () => {
            await this.update();
        });
    }

    async update() {
        this.lists = await this.listsService.lists();
    }

    async newList() {
        await this.listsService.createList({ name: 'Neue Liste' });
        await this.update();
    }
}
