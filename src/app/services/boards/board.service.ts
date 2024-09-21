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
  private url = '/assets/data.json';

  constructor(private http: HttpClient, private store: Store) {}

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

  fetchBoardByName(boardName: string) {
    this.http
      .get<{ boards: any[] }>(this.url)
      .pipe(
        map((data) => {
          const selectedBoard = data.boards.find(
            (board) => board.name === boardName
          );
          if (selectedBoard) {
            this.store.dispatch(loadBoardsSuccess({ boards: [selectedBoard] })); // Load only the selected board
          } else {
            this.store.dispatch(
              loadBoardsFailure({ error: 'Board not found' })
            );
          }
        }),
        catchError((error) => {
          this.store.dispatch(loadBoardsFailure({ error: error.message }));
          return of(null);
        })
      )
      .subscribe();
  }
}
