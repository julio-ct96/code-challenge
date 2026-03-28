import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Priority } from '@enums/Priority';
import { TodoFormField } from '@enums/TodoFormField';
import { OutputRefSubscription } from '@angular/core';
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

  describe('validation', () => {
    let button: HTMLButtonElement;

    beforeEach(() => {
      button = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
    });

    it('should disable submit button when title is empty', () => {
      expect(button.disabled).toBe(true);
    });

    it('should enable submit button when title is not empty', () => {
      component.form.controls[TodoFormField.TITLE].setValue('Buy milk');
      fixture.detectChanges();

      expect(button.disabled).toBe(false);
    });

    it('should disable submit button when title exceeds 60 characters', () => {
      component.form.controls[TodoFormField.TITLE].setValue('a'.repeat(61));
      fixture.detectChanges();

      expect(button.disabled).toBe(true);
    });

    it('should disable submit button when title is only whitespace', () => {
      component.form.controls[TodoFormField.TITLE].setValue('   ');
      fixture.detectChanges();

      expect(button.disabled).toBe(true);
    });

    it('should collapse multiple consecutive spaces into one', () => {
      const input: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="todo-title-input"]');
      input.value = 'Buy   milk';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe('Buy milk');
      expect(component.form.controls[TodoFormField.TITLE].value).toBe('Buy milk');
    });
  });

  describe('submit', () => {
    let sub: OutputRefSubscription;
    let button: HTMLButtonElement;

    beforeEach(() => {
      button = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
    });

    afterEach(() => sub?.unsubscribe());

    it('should emit addTodo with title and priority when form is submitted', () => {
      const addSpy = vi.fn();
      sub = component.addTodo.subscribe(addSpy);

      component.form.controls[TodoFormField.TITLE].setValue('Buy milk');
      fixture.detectChanges();
      button.click();

      expect(addSpy).toHaveBeenCalledWith({ title: 'Buy milk', priority: Priority.MEDIUM });
    });

    it('should reset form after successful submit', () => {
      component.form.controls[TodoFormField.TITLE].setValue('Buy milk');
      fixture.detectChanges();
      button.click();

      expect(component.form.controls[TodoFormField.TITLE].value).toBe('');
      expect(component.form.controls[TodoFormField.PRIORITY].value).toBe(Priority.MEDIUM);
    });

    it('should not emit addTodo when form is invalid', () => {
      const addSpy = vi.fn();
      sub = component.addTodo.subscribe(addSpy);

      button.click();

      expect(addSpy).not.toHaveBeenCalled();
    });
  });
});
