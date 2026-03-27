import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tasks', () => {
    const todoListElement = document.querySelector('#todoList');

    expect(todoListElement!.children.length).toBeGreaterThan(0);
  });

  it('should toggle test class when clicked', () => {
    const todoTaskElement = document.querySelector('#todoList>li');

    component.toggleClass(
      { currentTarget: todoTaskElement } as MouseEvent,
      'test'
    );

    expect(todoTaskElement!.className).toContain('test');

    component.toggleClass(
      { currentTarget: todoTaskElement } as MouseEvent,
      'test'
    );

    expect(todoTaskElement!.className).not.toContain('test');
  });
});
