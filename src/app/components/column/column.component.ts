import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column: any;
  countCompletedSubtasks(subtasks: any[]): number {
    return subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
