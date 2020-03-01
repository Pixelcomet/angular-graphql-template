import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { ToDoComponent } from './to-do/to-do.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ListsComponent, ListComponent, ToDoComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        GraphQLModule,
        HttpClientModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatInputModule,
        MatListModule,
        MatSnackBarModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
