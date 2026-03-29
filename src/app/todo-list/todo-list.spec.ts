import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { buildTodoFormPayloadMock } from '@mocks/todo-form-payload';
import { TodoService } from '@services/todo.service';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoItemComponent } from './components/todo-item/todo-item';
import { TodoListComponent } from './todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoListComponent],
    });

    service = TestBed.inject(TodoService);
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

  describe('addTodo wiring', () => {
    let formDebugElement: DebugElement;

    beforeEach(() => {
      formDebugElement = fixture.debugElement.query(By.css('[data-testid="todo-form"]'));
    });

    it('should add a todo and render it when form emits addTodo', () => {
      const formComponent: TodoForm = formDebugElement.componentInstance;
      formComponent.addTodo.emit(buildTodoFormPayloadMock());
      fixture.detectChanges();

      expect(service.todos().length).toBe(1);
      expect(service.todos()[0].title).toBe('Buy milk');

      const items = fixture.nativeElement.querySelectorAll('[data-testid="todo-item"]');
      expect(items.length).toBe(1);
    });
  });

  describe('toggleTodo wiring', () => {
    let itemDebugElement: DebugElement;

    beforeEach(() => {
      const formComponent: TodoForm = fixture.debugElement.query(By.css('[data-testid="todo-form"]')).componentInstance;
      formComponent.addTodo.emit(buildTodoFormPayloadMock());
      fixture.detectChanges();
      itemDebugElement = fixture.debugElement.query(By.css('[data-testid="todo-item"]'));
    });

    it('should toggle a todo when todo-item emits toggle', () => {
      const itemComponent: TodoItemComponent = itemDebugElement.componentInstance;

      expect(service.todos()[0].completed).toBe(false);

      itemComponent.toggle.emit(service.todos()[0].id);
      fixture.detectChanges();

      expect(service.todos()[0].completed).toBe(true);
    });
  });
});
