import { Priority } from '@enums/Priority';
import { TodoFormPayload } from '@interfaces/TodoFormPayload';

export const buildTodoFormPayloadMock = (overrides?: Partial<TodoFormPayload>): TodoFormPayload => ({
  title: 'Buy milk',
  priority: Priority.MEDIUM,
  ...overrides,
});
