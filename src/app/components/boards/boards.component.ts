import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BoardService } from '../../services/boards/board.service';
import { Board,Task } from '../../model/boardstate.model';
import { TaskpopupService } from '../../services/taskpopup/taskpopup.service';
import {
  selectIsPopupOpen,
  selectSelectedTask,
} from '../../store/taskpopup/taskpopup.selector';
import {
  closeTaskPopup,
  openTaskPopup,
} from '../../store/taskpopup/taskpopup.action';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { TaskService } from '../../services/taskservice/task.service';
import { selectActiveBoard, selectAllBoardsFromStore } from '../../store/boards/board.selector';
import * as BoardActions from '../../store/boards/board.action';
import { BoardState } from '../../store/boards/board.reducer';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css',
})
export class BoardsComponent {
  isDarkMode$: Observable<boolean>;
  boards$: Observable<Board[]>;
  selectedBoard$: Observable<Board | null>;
  activeBoard: Board | null = null; 

  isModalOpen = false;
  isBoardModalOpen = false; 
  selectedTask: Task | null = null;
  selectedColIndex: number = 0;
  selectedTaskIndex: number = 0;
  selectedBoardForEdit: Board | null = null;

  constructor(
    private store: Store<{
      theme: { isDarkMode: boolean };
      boards: BoardState;
    }>
  ) {
    this.isDarkMode$ = this.store.select((state) => state.theme.isDarkMode);
    this.boards$ = this.store.select(selectAllBoardsFromStore);
    this.selectedBoard$ = this.store.select(selectActiveBoard);
  }

  ngOnInit(): void {
    this.store.dispatch(BoardActions.loadBoards());

    
    this.selectedBoard$.subscribe((board) => {
      this.activeBoard = board;
    });

    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
        this.store.dispatch(
          BoardActions.setActiveBoard({ boardId: boards[0].id })
        );
      }
    });
  }

  getCompletedSubtaskCount(task: Task): number {
    return task.subtasks
      ? task.subtasks.filter((subtask) => subtask.isCompleted).length
      : 0;
  }

  getTotalSubtaskCount(task: Task): number {
    return task.subtasks ? task.subtasks.length : 0;
  }

  openTaskModal(columnIndex: number, taskIndex: number, task: Task) {
    this.selectedTask = task;
    this.selectedColIndex = columnIndex;
    this.selectedTaskIndex = taskIndex;
    this.isModalOpen = true;
  }

  openBoardEditModal(board: Board | null) {
    if (board) {
      this.selectedBoardForEdit = board; 
      this.isBoardModalOpen = true; 
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTask = null;
  }

  closeBoardModal() {
    this.isBoardModalOpen = false;
    this.selectedBoardForEdit = null;
  }

  handleSubtaskToggled(
    event: {
      colIndex: number;
      taskIndex: number;
      subtaskIndex: number;
      isCompleted: boolean;
    },
    task: Task
  ): void {
    const subtaskId = task.subtasks[event.subtaskIndex].id;

    this.store.dispatch(
      BoardActions.setSubtaskCompleted({
        colIndex: event.colIndex,
        taskIndex: event.taskIndex,
        subtaskIndex: event.subtaskIndex,
        isCompleted: event.isCompleted,
        subtaskId: subtaskId,
      })
    );
  }
}
