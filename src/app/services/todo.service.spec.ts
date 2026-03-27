import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Priority } from '@enums/Priority';
import { TodoFilter } from '@enums/TodoFilter';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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
  });
});
