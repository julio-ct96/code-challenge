import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';
import { TodoService } from '@services/todo.service';
import { TodoFilter } from './components/todo-filter/todo-filter';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoItemComponent } from './components/todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  // En apps standalone no hace falta importar commonModule ya que no se va a usar las antiguas directivas ngFor, ngIf, etc...
  imports: [TodoForm, TodoFilter, TodoItemComponent],
  templateUrl: './todo-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly #todoService = inject(TodoService);
  
  readonly todos = this.#todoService.todos;
  readonly filteredTodos = this.#todoService.filteredTodos;
  readonly activeFilter = this.#todoService.filter;

  readonly heading = computed(() => {
    const filtered = this.filteredTodos().length;
    const total = this.todos().length;

    return {
      [TodoFilterEnum.ALL]: `${filtered} things I have to do (${total} total)`,
      [TodoFilterEnum.COMPLETED]: `${filtered} things done (${total} total)`,
      [TodoFilterEnum.PENDING]: `${filtered} pending things I have to do (${total} total)`,
    }[this.activeFilter()];
  });
}
