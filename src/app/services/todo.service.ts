import { Injectable, signal } from '@angular/core';
import { Priority } from '@enums/Priority';
import { Todo } from '@interfaces/Todo';

// Dejo provide in root solo porque es una app pequeña, hay una unica instancia
// de la ruta TodoList. En una app real, lo ideal seria proveerlo en el componente 
// para que el estado solamente viva en ese "modulo" o componente
@Injectable({ providedIn: 'root' })
export class TodoService {
  readonly #todos = signal<Todo[]>([]);
  readonly todos = this.#todos.asReadonly();

  addTodo(title: string, priority: Priority): void {
    this.#todos.update(todos => [
      ...todos,
      { id: crypto.randomUUID(), title, priority, completed: false },
    ]);
  }
}
