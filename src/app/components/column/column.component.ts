import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { openTaskPopup } from '../../store/taskpopup/taskpopup.action';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column: any;

  constructor(private store: Store) {}


  openTask(task: any) {
    this.store.dispatch(openTaskPopup({ task }));
  }

  countCompletedSubtasks(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
