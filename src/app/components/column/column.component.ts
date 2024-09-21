import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { openTaskPopup } from '../../store/taskpopup/taskpopup.action';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Column, Task } from '../../model/boardstate.model';
import { moveTaskToColumn } from '../../store/boards/board.action';

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
  drop(event: CdkDragDrop<Task[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer !== event.container) {
      const updatedTask = { ...task, status: this.column.name };
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.store.dispatch(moveTaskToColumn({ task: updatedTask }));
    }
  }
}
