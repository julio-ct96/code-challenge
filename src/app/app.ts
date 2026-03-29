import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.html',
  host: { class: 'w-full p-2 flex flex-col items-center flex-1 min-h-0' },
})
export class App {}
