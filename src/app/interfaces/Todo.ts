import { Priority } from '@enums/Priority';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
}
