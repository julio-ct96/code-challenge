import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';
import { TodoFilter } from './todo-filter';

describe('TodoFilter', () => {
  let component: TodoFilter;
  let fixture: ComponentFixture<TodoFilter>;
  let buttons: NodeListOf<HTMLButtonElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoFilter],
    });

    fixture = TestBed.createComponent(TodoFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('[data-testid="filter-button"]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button for each filter option', () => {
    expect(buttons.length).toBe(3);
  });

  it('should render buttons with correct labels', () => {
    const labels = Array.from(buttons).map(b => b.textContent?.trim());
    expect(labels).toEqual(['All', 'Completed', 'Pending']);
  });

  it('should highlight the active filter', () => {
    fixture.componentRef.setInput('activeFilter', TodoFilterEnum.COMPLETED);
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('[data-testid="filter-button"]');

    const activeButton = Array.from(buttons).find(b => b.textContent?.trim() === 'Completed');
    expect(activeButton?.getAttribute('aria-pressed')).toBe('true');
  });
});
