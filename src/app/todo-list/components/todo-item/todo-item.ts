import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Todo } from '@interfaces/Todo';
import { PriorityLabel } from '@enums/Priority';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', class: 'flex items-center gap-4 p-2' },
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly toggle = output<string>();
  readonly delete = output<string>();

  readonly priorityLabel = computed(() => PriorityLabel[this.todo().priority]);
  readonly toggleLabel = computed(() => `Mark ${this.todo().title} as ${this.todo().completed ? 'pending' : 'completed'}`);
  readonly deleteLabel = computed(() => `Delete ${this.todo().title}`);

  onToggle(event: Event): void {
    event.preventDefault();
    this.toggle.emit(this.todo().id);
  }

  onDelete(): void {
    this.delete.emit(this.todo().id);
  }
}
