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
  // aqui aun no utilizo los nuevos formularios con signals porque no son estables
  readonly #fb = inject(NonNullableFormBuilder);

  readonly addTodo = output<TodoFormPayload>();

  protected readonly titleMaxLength = TITLE_MAX_LENGTH;

  // me gusta usar este patron de utilizar un enum para los nombres de los campos del formulario
  // para asegurar la robustez, si se cambia el nombre de un campo solo hay que modificar el enum
  // y no en todos los lugares donde se utiliza, incluido el template
  protected readonly field = TodoFormField;

  // este objeto es estatico por lo que no tiene sentido que sea un signal
  readonly priorityOptions = Object.entries(PriorityLabel).map(([value, label]) => ({
    value: Number(value),
    label,
  }));

  readonly form: FormGroup<TodoFormValue> = this.#fb.group({
    [this.field.TITLE]: ['', [Validators.required, Validators.maxLength(this.titleMaxLength), noWhitespaceOnly]],
    [this.field.PRIORITY]: [DEFAULT_PRIORITY],
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
