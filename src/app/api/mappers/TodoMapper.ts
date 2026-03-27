import { TodoDto } from '@api/dtos/TodoDto';
import { Priority } from '@enums/Priority';
import { Todo } from '@interfaces/Todo';

export class TodoMapper {
  static fromApi(dto: Partial<TodoDto>): Todo {
    return {
      id: dto.id?.toString() ?? crypto.randomUUID(),
      title: dto.todo ?? '-',
      completed: dto.completed ?? false,
      priority: Priority.MEDIUM,
    };
  }
}
