import { Priority } from '@enums/Priority';
import { Todo } from '@interfaces/Todo';

export const buildTodoMock = (overrides?: Partial<Todo>): Todo => ({
  id: '1',
  title: 'Buy milk',
  completed: false,
  priority: Priority.HIGH,
  ...overrides,
});
