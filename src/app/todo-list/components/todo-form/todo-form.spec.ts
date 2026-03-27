import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoForm } from './todo-form';

describe('TodoForm', () => {
  let component: TodoForm;
  let fixture: ComponentFixture<TodoForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoForm],
    });

    fixture = TestBed.createComponent(TodoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title input', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="todo-title-input"]');
    expect(input).toBeTruthy();
  });

  it('should render a priority select', () => {
    const select = fixture.nativeElement.querySelector('[data-testid="todo-priority-select"]');
    expect(select).toBeTruthy();
  });

  it('should render a submit button', () => {
    const button = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
    expect(button).toBeTruthy();
  });
});
