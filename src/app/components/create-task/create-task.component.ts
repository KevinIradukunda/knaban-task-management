import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { openTaskPopup } from '../../store/taskpopup/taskpopup.action';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  @Input() task: any;
  constructor(private store: Store) {}

  openTaskModal() {
    this.store.dispatch(openTaskPopup({ task: this.task }));
  }
}
