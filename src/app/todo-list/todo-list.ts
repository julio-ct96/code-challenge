import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';
import { TodoFormPayload } from '@interfaces/TodoFormPayload';
import { TodoService } from '@services/todo.service';
import { TodoFilter } from './components/todo-filter/todo-filter';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoItemComponent } from './components/todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  // En apps standalone no hace falta importar commonModule ya que no se va a usar las antiguas directivas ngFor, ngIf, etc...
  // @if o @for no necesita ningun import y la direccion del equipo de angular es eliminar el commonmodule
  imports: [TodoForm, TodoFilter, TodoItemComponent],
  templateUrl: './todo-list.html',
  // la deteccion de cambios onPush es un MUST si quieres que la app tenga buen rendimiento
  // obviamente tambien es necesario conocer como funciona la deteccion de cambios
  // y crear nuevas referencias solamente cuando se es necesario para no impactar el rendimiento en renderizar de nuevo
  // componentes que no estan impactados por X cambio de en la UI
  changeDetection: ChangeDetectionStrategy.OnPush,
  // utilizo el atributo host para evitar wrappers innecesarios en el dom
  // y poder aplicar estilos directamente al componente
  host: { role: 'main', class: 'flex flex-col w-full max-w-2xl flex-1 min-h-0' },
})
export class TodoListComponent {
  readonly #todoService = inject(TodoService);
  
  readonly todos = this.#todoService.todos;
  readonly filteredTodos = this.#todoService.filteredTodos;
  readonly activeFilter = this.#todoService.filter;
  readonly isLoadingTodos = this.#todoService.isLoadingTodos;
  readonly todosError = this.#todoService.todosError;

  // utilizo computed para mantener el html lo mas limpio posible de logica
  // y que el componente sea mas declarativo
  readonly heading = computed(() => {
    const filtered = this.filteredTodos().length;
    const total = this.todos().length;

    return {
      [TodoFilterEnum.ALL]: `${filtered} things I have to do (${total} total)`,
      [TodoFilterEnum.COMPLETED]: `${filtered} things done (${total} total)`,
      [TodoFilterEnum.PENDING]: `${filtered} pending things I have to do (${total} total)`,
    }[this.activeFilter()];
  });

  onAddTodo(payload: TodoFormPayload): void {
    this.#todoService.addTodo(payload.title, payload.priority);
  }

  onToggle(id: string): void {
    this.#todoService.toggleTodo(id);
  }

  onDelete(id: string): void {
    this.#todoService.deleteTodo(id);
  }

  onFilterChange(filter: TodoFilterEnum): void {
    this.#todoService.setFilter(filter);
  }
}
