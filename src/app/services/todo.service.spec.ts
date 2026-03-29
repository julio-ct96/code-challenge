import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TodoApi } from '@api/services/todo-api';
import { Priority } from '@enums/Priority';
import { TodoFilter } from '@enums/TodoFilter';
import { Todo } from '@interfaces/Todo';
import { buildApiResponseMock } from '@mocks/api-response';
import { buildTodoMock } from '@mocks/todo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(buildApiResponseMock<Todo[]>()) }) },
      ],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array of todos initially', () => {
    expect(service.todos()).toEqual([]);
  });

  describe('addTodo', () => {
    it('should add a todo with the given title and priority', () => {
      service.addTodo('Buy milk', Priority.HIGH);

      expect(service.todos()).toEqual([
        expect.objectContaining({
          title: 'Buy milk',
          priority: Priority.HIGH,
          completed: false,
        }),
      ]);
    });

    it('should generate a unique id for each todo', () => {
      service.addTodo('First', Priority.LOW);
      service.addTodo('Second', Priority.MEDIUM);

      const [first, second] = service.todos();
      expect(first.id).toBeTruthy();
      expect(second.id).toBeTruthy();
      expect(first.id).not.toBe(second.id);
    });
  });

  describe('toggleTodo', () => {
    let id: string;

    beforeEach(() => {
      service.addTodo('Buy milk', Priority.HIGH);
      id = service.todos()[0].id;
    });

    it('should mark an incomplete todo as completed', () => {
      service.toggleTodo(id);

      expect(service.todos()[0].completed).toBe(true);
    });

    it('should mark a completed todo as incomplete', () => {
      service.toggleTodo(id);
      service.toggleTodo(id);

      expect(service.todos()[0].completed).toBe(false);
    });
  });

  describe('deleteTodo', () => {
    it('should remove a todo by id', () => {
      service.addTodo('Buy milk', Priority.HIGH);
      service.addTodo('Walk dog', Priority.LOW);
      const id = service.todos()[0].id;

      service.deleteTodo(id);

      expect(service.todos()).toHaveLength(1);
      expect(service.todos()[0].title).toBe('Walk dog');
    });
  });

  describe('filteredTodos', () => {
    beforeEach(() => {
      service.addTodo('Buy milk', Priority.HIGH);
      service.addTodo('Walk dog', Priority.LOW);
      service.toggleTodo(service.todos()[0].id);
    });

    it('should return all todos when filter is ALL', () => {
      service.setFilter(TodoFilter.ALL);

      expect(service.filteredTodos()).toHaveLength(2);
    });

    it('should return only completed todos when filter is COMPLETED', () => {
      service.setFilter(TodoFilter.COMPLETED);

      expect(service.filteredTodos()).toHaveLength(1);
      expect(service.filteredTodos()[0].title).toBe('Buy milk');
    });

    it('should return only pending todos when filter is PENDING', () => {
      service.setFilter(TodoFilter.PENDING);

      expect(service.filteredTodos()).toHaveLength(1);
      expect(service.filteredTodos()[0].title).toBe('Walk dog');
    });

    it('should sort todos by priority descending (HIGH first)', () => {
      service.addTodo('Medium task', Priority.MEDIUM);
      service.setFilter(TodoFilter.ALL);

      const titles = service.filteredTodos().map(todo => todo.title);
      expect(titles).toEqual(['Buy milk', 'Medium task', 'Walk dog']);
    });
  });

  describe('filter', () => {
    it('should expose the current filter as a readonly signal', () => {
      expect(service.filter()).toBe(TodoFilter.ALL);
    });

    it('should update when setFilter is called', () => {
      service.setFilter(TodoFilter.COMPLETED);

      expect(service.filter()).toBe(TodoFilter.COMPLETED);
    });
  });

  describe('loadTodos (API integration)', () => {
    const mockApiTodos: Todo[] = [
      buildTodoMock({ id: '1', title: 'Buy groceries', priority: Priority.MEDIUM }),
      buildTodoMock({ id: '2', title: 'Walk the dog', completed: true, priority: Priority.MEDIUM }),
    ];

    it('should populate todos from API response declaratively', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(
            buildApiResponseMock<Todo[]>({ isLoading: true }),
            buildApiResponseMock<Todo[]>({ data: mockApiTodos }),
          ) }) },
        ],
      });
      const apiService = TestBed.inject(TodoService);

      expect(apiService.todos().length).toBe(2);
      expect(apiService.todos()[0].title).toBe('Buy groceries');
    });

    it('should expose isLoadingTodos signal from API response', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(buildApiResponseMock<Todo[]>()) }) },
        ],
      });
      const apiService = TestBed.inject(TodoService);

      expect(apiService.isLoadingTodos()).toBe(false);
    });

    it('should expose todosError signal from API response', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(
            buildApiResponseMock<Todo[]>({ isLoading: true }),
            buildApiResponseMock<Todo[]>({ error: 'Error loading todos' }),
          ) }) },
        ],
      });
      const apiService = TestBed.inject(TodoService);

      expect(apiService.todosError()).toBe('Error loading todos');
    });

    it('should keep todos empty on error', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(
            buildApiResponseMock<Todo[]>({ isLoading: true }),
            buildApiResponseMock<Todo[]>({ error: 'Error loading todos' }),
          ) }) },
        ],
      });
      const apiService = TestBed.inject(TodoService);

      expect(apiService.todos()).toEqual([]);
    });
  });
});
