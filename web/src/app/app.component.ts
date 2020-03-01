import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalsService } from './globals.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private globalsService: GlobalsService,
        private _snackBar: MatSnackBar
    ) {
        this.globalsService.snackBarEventEmitter.subscribe(message =>
            this.openSnackBar(message)
        );
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }
}
