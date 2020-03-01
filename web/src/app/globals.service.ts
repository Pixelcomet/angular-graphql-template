import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {
    snackBarEventEmitter: EventEmitter<string>;
    updateListsEmitter: EventEmitter<void>;
    updateToDosEmitter: EventEmitter<void>;

    constructor() {
        this.snackBarEventEmitter = new EventEmitter<string>();
        this.updateListsEmitter = new EventEmitter<void>();
        this.updateToDosEmitter = new EventEmitter<void>();
    }
}
