import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoardState } from '../../model/boardstate.model';
import {
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
} from '../../store/boards/board.action';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient, private store: Store<BoardState>) {}

  fetchBoards() {
    this.store.dispatch(loadBoards());

    this.http
      .get('/assets/data.json')
      .pipe(
        map((data: any) => {
          this.store.dispatch(loadBoardsSuccess({ boards: data.boards }));
        }),
        catchError((error) => {
          this.store.dispatch(loadBoardsFailure({ error: error.message }));
          return of(null);
        })
      )
      .subscribe();
  }
}
