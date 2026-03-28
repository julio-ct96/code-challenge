import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Priority, PriorityLabel } from '@enums/Priority';
import { MULTI_SPACE } from '@constants/multi-space';
import { noWhitespaceOnly } from '@validators/no-whitespace-only';
import { TITLE_MAX_LENGTH } from '../../constants/title-max-length';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  readonly #fb = inject(NonNullableFormBuilder);
  protected readonly titleMaxLength = TITLE_MAX_LENGTH;

  readonly priorityOptions = Object.entries(PriorityLabel).map(([value, label]) => ({
    value: Number(value) as Priority,
    label,
  }));

  readonly form = this.#fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength), noWhitespaceOnly]],
    priority: [Priority.MEDIUM],
  });

  onTitleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(MULTI_SPACE, ' ');
    this.form.controls.title.setValue(input.value);
  }
}
