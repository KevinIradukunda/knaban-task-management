import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../../services/boards/board.service';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { TaskService } from '../../services/taskservice/task.service';
import { Column, Task } from '../../model/boardstate.model';
import { Store } from '@ngrx/store';
import { addTask } from '../../store/boards/board.action';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-addtaskpopup',
  templateUrl: './addtaskpopup.component.html',
  styleUrl: './addtaskpopup.component.css',
})
export class AddtaskpopupComponent implements OnInit {
  taskForm: FormGroup;
  showForm: boolean = true;

  boardName: string | null = null;
  columns: Column[] = [];
  selectedColumnId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.fb.control('', Validators.required)]),
      status: ['todo', Validators.required],
      columnId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.taskService.selectedBoard$.subscribe((board) => {
      if (board) {
        this.boardName = board.name;
        this.columns = board.columns;
      }
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control('', Validators.required));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    this.selectedColumnId = this.taskForm.value.columnId;

    if (!this.boardName || !this.selectedColumnId) {
      console.error('Board name or Column ID is missing!');
      return;
    }

    if (this.taskForm.valid) {
      const newTask: Task = {
        id: uuidv4(),
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
        subtasks: this.taskForm.value.subtasks.map((subtask: string) => ({
          id: uuidv4(),
          title: subtask,
          isCompleted: false,
        })),
      };

      const selectedBoard = this.taskService.selectedBoardSource.value;
      const newColIndex = selectedBoard?.columns.findIndex(
        (column) => column.id === this.selectedColumnId
      );

      if (newColIndex !== undefined && newColIndex >= 0) {
        this.store.dispatch(
          addTask({
            boardName: this.boardName,
            task: newTask,
            newColIndex: newColIndex,
          })
        );

        this.taskForm.reset({
          title: '',
          description: '',
          subtasks: [''],
          status: 'todo',
          columnId: '',
        });
        this.subtasks.clear();
        this.showForm = false;
      } else {
        console.error('Column ID does not exist in the selected board!');
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}


