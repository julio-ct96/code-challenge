import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { TodoFilter } from './todo-filter';

describe('TodoFilter', () => {
  let component: TodoFilter;
  let fixture: ComponentFixture<TodoFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
