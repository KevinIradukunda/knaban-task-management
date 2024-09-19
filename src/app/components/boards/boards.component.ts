import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBoards, selectLoading } from '../../store/boards/board.selector';
import { BoardService } from '../../services/boards/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css',
})
export class BoardsComponent {
  boards$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store, private boardService: BoardService) {
    this.boards$ = this.store.select(selectAllBoards);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.boardService.fetchBoards();
  }
}
function selectError(state: object): string | null {
  throw new Error('Function not implemented.');
}

