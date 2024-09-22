import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, take } from 'rxjs';
import { sidebarState } from '../../model/sidebar.model';
import { Store } from '@ngrx/store';
import { isSidebarVisible } from '../../store/sidebar/sidebar.selector';
import { hideSidebar, showSidebar } from '../../store/sidebar/sidebar.action';
import { BoardService } from '../../services/boards/board.service';
import { Board } from '../../model/boardstate.model';
import { ThemeState } from '../../store/theme/theme.reducer';
import { TaskService } from '../../services/taskservice/task.service';
import { selectAllBoardsFromStore } from '../../store/boards/board.selector';
import { setActiveBoard } from '../../store/boards/board.action';
import { toggleTheme } from '../../store/theme/theme.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  activeItem: string = '';
  isSidebarCollapsed: boolean = false;
  isDarkMode$: Observable<boolean>;
  boards$: Observable<Board[]>;

  @Output() sidebarToggled = new EventEmitter<boolean>();
  @Output() boardSelected = new EventEmitter<Board>();
  isCreateBoardModalOpen: boolean = false;

  constructor(
    private store: Store<{ theme: ThemeState; boards: any }>,
    private taskService: TaskService
  ) {
    this.isDarkMode$ = this.store.select((state) => state.theme.isDarkMode);
    this.boards$ = this.store.select(selectAllBoardsFromStore);
  }

  ngOnInit(): void {
    this.boards$.subscribe((boards) => {
      if (boards && boards.length > 0) {
        const activeBoard = this.getActiveBoardFromStore();
        const boardToActivate = activeBoard ?? boards[0];

        this.activeItem = boardToActivate.name;
        this.boardSelected.emit(boardToActivate);
        this.taskService.setSelectedBoard(boardToActivate);
        this.store.dispatch(setActiveBoard({ boardId: boardToActivate.id }));

        if (boardToActivate.columns && boardToActivate.columns.length > 0) {
          this.taskService.setSelectedColumnId(boardToActivate.columns[0].id);
        }
      }
    });
  }

  getActiveBoardFromStore(): Board | null {
    let activeBoard: Board | null = null;
    this.store
      .select('boards')
      .pipe(take(1))
      .subscribe((state) => {
        activeBoard = state.activeBoard;
      });
    return activeBoard;
  }

  setActive(board: Board): void {
    this.activeItem = board.name;
    this.boardSelected.emit(board);

    this.taskService.setSelectedBoard(board);
    this.store.dispatch(setActiveBoard({ boardId: board.id }));

    if (board.columns.length > 0) {
      this.taskService.setSelectedColumnId(board.columns[0].id);
    }

    console.log('Selected board ID:', board.id);
    console.log('Selected board Name:', board.name);
    board.columns.forEach((column) => {
      console.log('Column ID:', column.id);
    });
  }

  selectColumn(columnId: string): void {
    this.taskService.setSelectedColumnId(columnId);
  }

  isActive(boardName: string): boolean {
    return this.activeItem === boardName;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarToggled.emit(!this.isSidebarCollapsed);
  }

  toggleTheme(): void {
    this.store.dispatch(toggleTheme());
  }

  openCreateBoardModal(): void {
    this.isCreateBoardModalOpen = true;
  }

  closeCreateBoardModal(): void {
    this.isCreateBoardModalOpen = false;
  }
}
