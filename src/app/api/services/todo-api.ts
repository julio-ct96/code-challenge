import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { TodoApiResponseDto } from '@api/dtos/TodoApiResponseDto';
import { ApiResponse } from '@api/interfaces/ApiResponse';
import { TodoMapper } from '@api/mappers/TodoMapper';
import { Todo } from '@interfaces/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://dummyjson.com/todos';

  loadTodos(): Observable<ApiResponse<Todo[]>> {
    return this.#http.get<TodoApiResponseDto>(this.#apiUrl).pipe(
      map(response => ({
        data: response.todos.map(TodoMapper.fromApi),
        isLoading: false,
        error: null,
      })),
      catchError(() => of({
        data: [] as Todo[],
        isLoading: false,
        error: 'Error loading todos',
      })),
      startWith({ data: [] as Todo[], isLoading: true, error: null }),
    );
  }
}
