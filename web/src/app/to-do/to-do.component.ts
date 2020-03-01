import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from '../interfaces/ToDo';
import { ToDosService } from '../to-dos.service';
import { GlobalsService } from '../globals.service';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
    @Input() toDo: ToDo;

    done: boolean = true;
    disabled: boolean;

    constructor(
        private toDoService: ToDosService,
        private globalsService: GlobalsService
    ) {}

    ngOnInit() {}

    updateToDo() {
        this.toDoService.updateToDo(this.toDo);
    }

    async deleteToDo() {
        await this.toDoService.deleteToDo(this.toDo._id);
        this.globalsService.updateToDosEmitter.emit();
    }
}
