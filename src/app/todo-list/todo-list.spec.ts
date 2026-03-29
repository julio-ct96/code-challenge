import { DebugElement } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoApi } from '@api/services/todo-api';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';
import { Todo } from '@interfaces/Todo';
import { buildApiResponseMock } from '@mocks/api-response';
import { buildTodoFormPayloadMock } from '@mocks/todo-form-payload';
import { TodoService } from '@services/todo.service';
import { of } from 'rxjs';
import { TodoFilter } from './components/todo-filter/todo-filter';
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
      providers: [
        // aqui a la horad de proveer mocks es mas seguro usar un useFactory para evitar 
        // que si el se muta un mock en un test, este no afecte a otros tests, aunque para el mock ya nos estemos asegurando
        // utilizando una funcion build que siempre devuelve el mismo estado inicial
        { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(buildApiResponseMock<Todo[]>()) }) },
      ],
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

  describe('deleteTodo wiring', () => {
    let itemDebugElement: DebugElement;

    beforeEach(() => {
      const formComponent: TodoForm = fixture.debugElement.query(By.css('[data-testid="todo-form"]')).componentInstance;
      formComponent.addTodo.emit(buildTodoFormPayloadMock());
      fixture.detectChanges();
      itemDebugElement = fixture.debugElement.query(By.css('[data-testid="todo-item"]'));
    });

    it('should delete a todo when todo-item emits delete', () => {
      const itemComponent: TodoItemComponent = itemDebugElement.componentInstance;

      expect(service.todos().length).toBe(1);

      itemComponent.delete.emit(service.todos()[0].id);
      fixture.detectChanges();

      expect(service.todos().length).toBe(0);

      const items = fixture.nativeElement.querySelectorAll('[data-testid="todo-item"]');
      expect(items.length).toBe(0);
    });
  });

  describe('loading state', () => {
    it('should show loading indicator when todos are loading', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TodoListComponent],
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(buildApiResponseMock<Todo[]>({ isLoading: true })) }) },
        ],
      });
      const loadingFixture = TestBed.createComponent(TodoListComponent);
      loadingFixture.detectChanges();

      const loading = loadingFixture.nativeElement.querySelector('[data-testid="loading-indicator"]');
      expect(loading).toBeTruthy();
    });

    it('should hide loading indicator when todos are loaded', () => {
      const loading = fixture.nativeElement.querySelector('[data-testid="loading-indicator"]');
      expect(loading).toBeFalsy();
    });
  });

  describe('error state', () => {
    it('should show error message when todosError is set', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TodoListComponent],
        providers: [
          { provide: TodoApi, useFactory: () => ({ loadTodos: () => of(buildApiResponseMock<Todo[]>({ error: 'Error loading todos' })) }) },
        ],
      });
      const errorFixture = TestBed.createComponent(TodoListComponent);
      errorFixture.detectChanges();

      const error = errorFixture.nativeElement.querySelector('[data-testid="error-message"]');
      expect(error).toBeTruthy();
      expect(error.textContent).toContain('Error loading todos');
    });

    it('should hide error message when there is no error', () => {
      const error = fixture.nativeElement.querySelector('[data-testid="error-message"]');
      expect(error).toBeFalsy();
    });
  });

  describe('filterChange wiring', () => {
    let filterDebugElement: DebugElement;

    beforeEach(() => {
      filterDebugElement = fixture.debugElement.query(By.css('[data-testid="todo-filter"]'));
    });

    it('should update service filter when filter emits filterChange', () => {
      const filterComponent: TodoFilter = filterDebugElement.componentInstance;

      expect(service.filter()).toBe(TodoFilterEnum.ALL);

      filterComponent.filterChange.emit(TodoFilterEnum.COMPLETED);
      fixture.detectChanges();

      expect(service.filter()).toBe(TodoFilterEnum.COMPLETED);
    });
  });
});
