import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TodoFilter as TodoFilterEnum } from '@enums/TodoFilter';

// Este componente podria ser generico, recibiendo por input el enum de filtros y el filtro activo pero por simpleza lo hice asi
// tampoco me di cuenta porque me centre en el tdd
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
