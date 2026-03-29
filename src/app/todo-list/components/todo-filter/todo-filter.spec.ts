import { OutputRefSubscription } from '@angular/core';
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
    const labels = Array.from(buttons).map(button => button.textContent?.trim());
    expect(labels).toEqual(['All', 'Completed', 'Pending']);
  });

  it('should highlight the active filter', () => {
    fixture.componentRef.setInput('activeFilter', TodoFilterEnum.COMPLETED);
    fixture.detectChanges();
    buttons = fixture.nativeElement.querySelectorAll('[data-testid="filter-button"]');

    const activeButton = Array.from(buttons).find(button => button.textContent?.trim() === 'Completed');
    expect(activeButton?.getAttribute('aria-pressed')).toBe('true');
  });

  describe('filterChange output', () => {
    let emittedFilter: TodoFilterEnum | undefined;
    let sub: OutputRefSubscription;

    afterEach(() => sub?.unsubscribe());

    it('should emit the selected filter when a button is clicked', () => {
      sub = component.filterChange.subscribe(value => (emittedFilter = value));

      const pendingButton = Array.from(buttons).find(button => button.textContent?.trim() === 'Pending');
      expect(pendingButton).toBeTruthy();
      pendingButton?.click();

      expect(emittedFilter).toBe(TodoFilterEnum.PENDING);
    });

    it('should emit when clicking the already active filter', () => {
      sub = component.filterChange.subscribe(value => (emittedFilter = value));

      const allButton = Array.from(buttons).find(button => button.textContent?.trim() === 'All');
      expect(allButton).toBeTruthy();
      allButton?.click();

      expect(emittedFilter).toBe(TodoFilterEnum.ALL);
    });
  });
});
