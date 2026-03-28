import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TodoFormField } from '@enums/TodoFormField';
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
    it('should disable submit button when title is empty', () => {
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
      expect(button.disabled).toBe(true);
    });

    it('should enable submit button when title is not empty', () => {
      component.form.controls[TodoFormField.TITLE].setValue('Buy milk');
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
      expect(button.disabled).toBe(false);
    });

    it('should disable submit button when title exceeds 60 characters', () => {
      component.form.controls[TodoFormField.TITLE].setValue('a'.repeat(61));
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
      expect(button.disabled).toBe(true);
    });

    it('should disable submit button when title is only whitespace', () => {
      component.form.controls[TodoFormField.TITLE].setValue('   ');
      fixture.detectChanges();

      const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="todo-submit"]');
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
});
