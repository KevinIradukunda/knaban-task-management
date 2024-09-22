import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddtaskmodalService } from '../../services/addtaskmodal/addtaskmodal.service';
import { Board } from '../../model/boardstate.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../store/theme/theme.reducer';
import { selectAllBoardsFromStore } from '../../store/boards/board.selector';
import { toggleTheme } from '../../store/theme/theme.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() selectedBoard: Board | null = null;
  @Input() selectedColumnId?: string;

  @Output() boardSelected = new EventEmitter<Board>();

  isDarkMode$: Observable<boolean>;
  isDropdownOpen = false;
  isModalOpen = false;
  isAddTaskModalOpen = false;

  boards$: Observable<Board[]>;

  constructor(private store: Store<{ theme: ThemeState; boards: any }>) {
    this.isDarkMode$ = this.store.select((state) => state.theme.isDarkMode);

    this.boards$ = this.store.select(selectAllBoardsFromStore);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateTo(board: Board) {
    this.boardSelected.emit(board);
    this.isDropdownOpen = false;
  }

  isActive(boardName: string): boolean {
    return this.selectedBoard ? this.selectedBoard.name === boardName : false;
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  toggleAddTaskModal() {
    this.isAddTaskModalOpen = !this.isAddTaskModalOpen;
  }
}
