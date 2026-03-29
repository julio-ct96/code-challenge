import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';

@Component({
  selector: 'app-todo-filter',
  imports: [TitleCasePipe],
  templateUrl: './todo-filter.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex items-center gap-2 p-2',
    role: 'toolbar',
    'aria-label': 'Filter todos',
  },
})
export class TodoFilter {
  readonly activeFilter = input<TodoFilterEnum>(TodoFilterEnum.ALL);
  readonly filterChange = output<TodoFilterEnum>();
  readonly filters: TodoFilterEnum[] = Object.values(TodoFilterEnum);

  onFilterClick(filter: TodoFilterEnum): void {
    this.filterChange.emit(filter);
  }

  readonly activeStates = computed(() => {
    const active = this.activeFilter();
    return Object.fromEntries(this.filters.map(filter => [filter, filter === active])) as Record<TodoFilterEnum, boolean>;
  });
}
