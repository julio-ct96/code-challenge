import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Todo } from '@interfaces/Todo';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly toggle = output<string>();
  readonly delete = output<string>();
}
