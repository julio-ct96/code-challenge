import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoApi } from '@api/services/todo-api';
import { Priority } from '@enums/Priority';
import { TodoFilter } from '@enums/TodoFilter';
import { Todo } from '@interfaces/Todo';

// Dejo provide in root solo porque es una app pequeña, hay una unica instancia
// de la ruta TodoList. En una app real, lo ideal seria proveerlo en el componente
// para que el estado solamente viva en ese "modulo" o componente
@Injectable({ providedIn: 'root' })
export class TodoService {
  readonly #todoApi = inject(TodoApi);

  // Aqui uso toSignal para convertir el Observable de la API en un Signal y que maneje la sub automaticamente
  // y uso requireSync porque la API devuelve siempre ApiResponse 
  // ademas esto es clave para un flujo declarativo y reactivo moderno
  readonly #apiResponse = toSignal(this.#todoApi.loadTodos(), { requireSync: true });

  // aqui uso linkedSignal porque necesito un estado que se pueda sobreescribir
  // y que ademas se sincronoce automaticamente cuando la API responda con datos nuevos 
  // en caso de tener que rehacer llamadas otra vez
  // hacer esto me ha permitido tener impacto 0 en el componente que consumia los todos
  // la integracion con la api no ha impactado a la capa del componente 
  readonly #todos = linkedSignal(() => this.#apiResponse().data);
  readonly #filter = signal<TodoFilter>(TodoFilter.ALL);

  readonly #filterStrategies: Record<TodoFilter, (todo: Todo) => boolean> = {
    [TodoFilter.ALL]: () => true,
    [TodoFilter.COMPLETED]: todo => todo.completed,
    [TodoFilter.PENDING]: todo => !todo.completed,
  };

  readonly todos = this.#todos.asReadonly();
  readonly filter = this.#filter.asReadonly();
  readonly isLoadingTodos = computed(() => this.#apiResponse().isLoading);
  readonly todosError = computed(() => this.#apiResponse().error);

  readonly filteredTodos = computed(() =>
    this.#todos()
      .filter(this.#filterStrategies[this.#filter()])
      //  uso aqui el toSorted() en vez de sort() para no mutar el array original
      .toSorted((a: Todo, b: Todo) => b.priority - a.priority)
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
