import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
} from './board.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() =>
        this.http.get('/assets/data.json').pipe(
          map((data: any) => loadBoardsSuccess({ boards: data.boards })),
          catchError((error) => of(loadBoardsFailure({ error: error.message })))
        )
      )
    )
  );
}
