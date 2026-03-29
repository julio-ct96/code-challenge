import { provideHttpClient } from '@angular/common/http';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';
import { ApiResponse } from '@api/interfaces/ApiResponse';
import { TodoApiResponseDto } from '@api/dtos/TodoApiResponseDto';
import { Priority } from '@enums/Priority';
import { Todo } from '@interfaces/Todo';
import { TodoApi } from './todo-api';

describe('TodoApi', () => {
  let service: TodoApi;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TodoApi);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadTodos', () => {
    const mockResponse: TodoApiResponseDto = {
      todos: [
        { id: 1, todo: 'Buy groceries', completed: false, userId: 1 },
        { id: 2, todo: 'Walk the dog', completed: true, userId: 1 },
      ],
      total: 150,
      skip: 0,
      limit: 30,
    };

    it('should emit loading state first', () => {
      const emissions: ApiResponse<Todo[]>[] = [];

      service.loadTodos().pipe(take(2)).subscribe(response => emissions.push(response));

      expect(emissions[0]).toEqual({ data: [], isLoading: true, error: null });

      httpTesting.expectOne('https://dummyjson.com/todos').flush(mockResponse);
    });

    it('should emit success state with mapped todos', () => {
      const emissions: ApiResponse<Todo[]>[] = [];

      service.loadTodos().pipe(take(2)).subscribe(response => emissions.push(response));

      httpTesting.expectOne('https://dummyjson.com/todos').flush(mockResponse);

      expect(emissions.length).toBe(2);
      expect(emissions[1].isLoading).toBe(false);
      expect(emissions[1].error).toBeNull();
      expect(emissions[1].data.length).toBe(2);
      expect(emissions[1].data[0].id).toBe('1');
      expect(emissions[1].data[0].title).toBe('Buy groceries');
      expect(emissions[1].data[0].completed).toBe(false);
      expect(emissions[1].data[0].priority).toBe(Priority.MEDIUM);
    });

    it('should emit error state with controlled message on failure', () => {
      const emissions: ApiResponse<Todo[]>[] = [];

      service.loadTodos().pipe(take(2)).subscribe(response => emissions.push(response));

      httpTesting.expectOne('https://dummyjson.com/todos').error(new ProgressEvent('error'));

      expect(emissions.length).toBe(2);
      expect(emissions[1].isLoading).toBe(false);
      expect(emissions[1].error).toBe('Error loading todos');
      expect(emissions[1].data).toEqual([]);
    });

    it('should handle empty todos array', () => {
      const emissions: ApiResponse<Todo[]>[] = [];
      const emptyResponse: TodoApiResponseDto = { todos: [], total: 0, skip: 0, limit: 30 };

      service.loadTodos().pipe(take(2)).subscribe(response => emissions.push(response));

      httpTesting.expectOne('https://dummyjson.com/todos').flush(emptyResponse);

      expect(emissions.length).toBe(2);
      expect(emissions[1].data).toEqual([]);
      expect(emissions[1].isLoading).toBe(false);
      expect(emissions[1].error).toBeNull();
    });
  });
});
