import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from '../../store/boards/board.action';
import {
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
} from './board.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { BoardService } from '../../services/boards/board.service';

@Injectable()
export class BoardEffects {
  private actions$ = inject(Actions);
  constructor(private boardService: BoardService) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() =>
        this.boardService.getBoards().pipe(
          map((boards) => BoardActions.loadBoardsSuccess({ boards })),
          catchError((error) => of(BoardActions.loadBoardsFailure({ error })))
        )
      )
    )
  );
}
