import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoListComponent } from './todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListComponent],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering', () => {
    it('should render the todo form', () => {
      const form = fixture.nativeElement.querySelector('[data-testid="todo-form"]');
      expect(form).toBeTruthy();
    });

    it('should render the todo filter', () => {
      const filter = fixture.nativeElement.querySelector('[data-testid="todo-filter"]');
      expect(filter).toBeTruthy();
    });

    it('should render no todo items when list is empty', () => {
      const items = fixture.nativeElement.querySelectorAll('[data-testid="todo-item"]');
      expect(items.length).toBe(0);
    });
  });
});
