import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoService } from './todo.service';
import { Priority } from '@enums/Priority';

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
});
