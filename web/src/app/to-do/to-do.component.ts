import { Component, Input } from '@angular/core';
import { ToDo } from '../interfaces/ToDo';
import { ToDosService } from '../to-dos.service';
import { GlobalsService } from '../globals.service';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {
    /** input that catches arguments wrapped in [toDo]="object" inside the
     * template code (html) */
    @Input() toDo: ToDo;

    constructor(
        private toDoService: ToDosService,
        private globalsService: GlobalsService
    ) {}

    // pushes changes on the local to-do to the server
    updateToDo() {
        this.toDoService.updateToDo(this.toDo);
    }

    // deletes this to-do, then instructs the lists component to update all to
    // dos in all lists (pull from server)
    async deleteToDo() {
        await this.toDoService.deleteToDo(this.toDo._id);
        this.globalsService.updateToDosEmitter.emit();
    }
}
