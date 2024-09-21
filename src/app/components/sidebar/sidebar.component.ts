import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { sidebarState } from '../../model/sidebar.model';
import { Store } from '@ngrx/store';
import { isSidebarVisible } from '../../store/sidebar/sidebar.selector';
import { hideSidebar, showSidebar } from '../../store/sidebar/sidebar.action';
import { BoardService } from '../../services/boards/board.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isVisible$: Observable<boolean>;
  selectedBoard: string = 'Platform Launch';

  constructor(private store: Store, private boardService: BoardService) {
    this.isVisible$ = this.store.select(isSidebarVisible);
  }

  selectBoard(boardName: string) {
    this.selectedBoard = boardName;
    this.boardService.fetchBoardByName(boardName);
  }

  hideSidebar() {
    this.store.dispatch(hideSidebar());
  }
  showSidebar() {
    this.store.dispatch(showSidebar());
  }
}
