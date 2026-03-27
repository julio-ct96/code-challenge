import { computed, Injectable, signal } from '@angular/core';
import { Priority } from '@enums/Priority';
import { TodoFilter } from '@enums/TodoFilter';
import { Todo } from '@interfaces/Todo';

// Dejo provide in root solo porque es una app pequeña, hay una unica instancia
// de la ruta TodoList. En una app real, lo ideal seria proveerlo en el componente 
// para que el estado solamente viva en ese "modulo" o componente
@Injectable({ providedIn: 'root' })
export class TodoService {
  readonly #todos = signal<Todo[]>([]);
  readonly #filter = signal<TodoFilter>(TodoFilter.ALL);

  readonly #filterStrategies: Record<TodoFilter, (todo: Todo) => boolean> = {
    [TodoFilter.ALL]: () => true,
    [TodoFilter.COMPLETED]: todo => todo.completed,
    [TodoFilter.PENDING]: todo => !todo.completed,
  };

  readonly todos = this.#todos.asReadonly();

  readonly filteredTodos = computed(() =>
    this.#todos().filter(this.#filterStrategies[this.#filter()])
  );

  addTodo(title: string, priority: Priority): void {
    this.#todos.update(todos => [
      ...todos,
      { id: crypto.randomUUID(), title, priority, completed: false },
    ]);
  }

  toggleTodo(id: string): void {
    this.#todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: string): void {
    this.#todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  setFilter(filter: TodoFilter): void {
    this.#filter.set(filter);
  }
}
