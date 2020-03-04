import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalsService {
    // event emitter for passing messages to the app component (which can
    // display them in a snack bar)
    snackBarEventEmitter: EventEmitter<string>;
    // emitter that instructs the lists component to reload all lists
    updateListsEmitter: EventEmitter<void>;
    // emitter that instructs the lists component to reload all to dos, but not
    // the lists containing them
    updateToDosEmitter: EventEmitter<void>;

    constructor() {
        this.snackBarEventEmitter = new EventEmitter<string>();
        this.updateListsEmitter = new EventEmitter<void>();
        this.updateToDosEmitter = new EventEmitter<void>();
    }
}
