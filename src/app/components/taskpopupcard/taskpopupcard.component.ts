import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { closeTaskPopup } from '../../store/taskpopup/taskpopup.action';
import {
  selectIsPopupOpen,
  selectSelectedTask,
} from '../../store/taskpopup/taskpopup.selector';
import { moveTaskToColumn } from '../../store/boards/board.action';
import { TaskpopupService } from '../../services/taskpopup/taskpopup.service';

@Component({
  selector: 'app-taskpopupcard',
  templateUrl: './taskpopupcard.component.html',
  styleUrl: './taskpopupcard.component.css',
})
export class TaskpopupcardComponent {
  @Input() selectedTask: any;
  @Input() isPopupOpen$!: Observable<boolean>;

  constructor(
    private store: Store,
    private taskpopupService: TaskpopupService
  ) {}
  ngOnInit(): void {
    this.store.select(selectSelectedTask).subscribe((task) => {
      this.selectedTask = task;
    });
  }

  closeModal() {
    this.store.dispatch(closeTaskPopup());
  }
  countCompletedSubtasks(subtasks: any[]): number {
    return subtasks?.filter((subtask) => subtask.isCompleted).length || 0;
  }
  onSubtaskChange(subtask: any) {
    console.log('Subtask changed:', subtask);
  }
  onStatusChange(newStatus: string) {
    const updatedTask = { ...this.selectedTask, status: newStatus };
    this.store.dispatch(moveTaskToColumn({ task: updatedTask }));
    this.taskpopupService.closeTaskModal();
  }
}
