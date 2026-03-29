import { FormControl } from '@angular/forms';
import { Priority } from '@enums/Priority';
import { TodoFormField } from '@enums/TodoFormField';

export interface TodoFormValue {
  [TodoFormField.TITLE]: FormControl<string>;
  [TodoFormField.PRIORITY]: FormControl<Priority>;
}
