import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Priority, PriorityLabel } from '@enums/Priority';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  readonly #fb = inject(NonNullableFormBuilder);

  readonly priorityOptions = Object.entries(PriorityLabel).map(([value, label]) => ({
    value: Number(value) as Priority,
    label,
  }));

  readonly form = this.#fb.group({
    title: ['', Validators.required],
    priority: [Priority.MEDIUM],
  });
}
