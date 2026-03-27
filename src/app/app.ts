import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.html',
})
export class App {}
