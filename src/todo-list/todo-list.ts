import {  Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
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
