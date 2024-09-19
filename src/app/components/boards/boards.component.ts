import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAllBoards,
  selectLoading,
} from '../../store/boards/board.selector';
import { BoardService } from '../../services/boards/board.service';
import { BoardState } from '../../model/boardstate.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css',
})
export class BoardsComponent {
  boards$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<BoardState>,
    private boardService: BoardService
  ) {
    this.boards$ = this.store.select(selectAllBoards);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.boardService.fetchBoards();
  }

  addNewColumn() {
    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
        const newColumn = {
          name: 'New Column',
          tasks: [],
        };

        boards[0].columns.push(newColumn);
      }
    });
  }
}
function selectError(state: object): string | null {
  throw new Error('Function not implemented.');
}
