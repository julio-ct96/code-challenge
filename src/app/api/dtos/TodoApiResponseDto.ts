import { TodoDto } from './TodoDto';

export interface TodoApiResponseDto {
  todos: TodoDto[];
  total: number;
  skip: number;
  limit: number;
}
