import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item';
import { buildTodoMock } from '@mocks/todo';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    });

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('todo', buildTodoMock());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the todo title', () => {
    const title = fixture.nativeElement.querySelector('[data-testid="todo-title"]');
    expect(title).toBeTruthy();
    expect(title.textContent?.trim()).toBe('Buy milk');
  });

  it('should render a checkbox', () => {
    const checkbox = fixture.nativeElement.querySelector('[data-testid="todo-checkbox"]');
    expect(checkbox).toBeTruthy();
  });

  it('should reflect completed state in checkbox', () => {
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-checkbox"]');
    expect(checkbox.checked).toBe(false);

    fixture.componentRef.setInput('todo', buildTodoMock({ completed: true }));
    fixture.detectChanges();

    expect(checkbox.checked).toBe(true);
  });

  it('should not change checkbox state on click (parent owns state)', () => {
    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-checkbox"]');
    expect(checkbox.checked).toBe(false);

    checkbox.click();

    expect(checkbox.checked).toBe(false);
  });

  it('should emit toggle when checkbox changes', () => {
    const toggleSpy = vi.fn();
    component.toggle.subscribe(toggleSpy);

    const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-checkbox"]');
    checkbox.click();

    expect(toggleSpy).toHaveBeenCalledWith('1');
  });

  it('should emit delete when delete button is clicked', () => {
    const deleteSpy = vi.fn();
    component.delete.subscribe(deleteSpy);

    const deleteBtn: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="todo-delete"]');
    deleteBtn.click();

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should display priority badge with correct text', () => {
    const badge = fixture.nativeElement.querySelector('[data-testid="priority-badge"]');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('HIGH');
  });

  it('should apply line-through style when todo is completed', () => {
    fixture.componentRef.setInput('todo', buildTodoMock({ completed: true }));
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('[data-testid="todo-title"]');
    expect(title.classList.contains('line-through')).toBe(true);
  });
});
