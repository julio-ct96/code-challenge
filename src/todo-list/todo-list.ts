import { Component, effect, signal } from '@angular/core';


@Component({
  selector: 'app-todo-list',
  imports: [], // En apps standalone no hace falta importar commonModule ya que no se va a usar las antiguas directivas ngFor, ngIf, etc...
  templateUrl: './todo-list.html',
})
export class TodoListComponent  {
  count = signal<number>(0)

  constructor() {
    effect(() => {
      this.count.set(document.querySelectorAll('#todoList>li').length)
    })
  }

  toggleClass(ev: MouseEvent, className: string) {
    const el = ev.currentTarget as HTMLElement;
    el.classList.toggle(className);
  }

}
