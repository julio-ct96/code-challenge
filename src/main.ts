import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { TodoListComponent } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  template: `
  <div class="w-full p-2 flex flex-col items-center">
  <h1 class="text-3xl font-bold underline mb-16">Code Challenge</h1>
  <app-todo-list></app-todo-list>
</div>
`,
})
export class App {}

bootstrapApplication(App);
