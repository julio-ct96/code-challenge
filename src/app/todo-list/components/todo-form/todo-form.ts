import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MULTI_SPACE } from '@constants/multi-space';
import { PriorityLabel } from '@enums/Priority';
import { TodoFormField } from '@enums/TodoFormField';
import { TodoFormPayload } from '@interfaces/TodoFormPayload';
import { TodoFormValue } from '@interfaces/TodoFormValue';
import { noWhitespaceOnly } from '@validators/no-whitespace-only';
import { DEFAULT_PRIORITY } from '../../constants/default-priority';
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
  protected readonly field = TodoFormField;

  readonly priorityOptions = Object.entries(PriorityLabel).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

  readonly addTodo = output<TodoFormPayload>();

  readonly form: FormGroup<TodoFormValue> = this.#fb.group({
    [TodoFormField.TITLE]: ['', [Validators.required, Validators.maxLength(this.titleMaxLength), noWhitespaceOnly]],
    [TodoFormField.PRIORITY]: [DEFAULT_PRIORITY],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.addTodo.emit(this.form.getRawValue());
    this.form.reset();
  }

  onTitleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(MULTI_SPACE, ' ');
    this.form.controls[this.field.TITLE].setValue(input.value);
  }
}
