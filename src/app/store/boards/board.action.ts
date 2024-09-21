import { createAction, props } from '@ngrx/store';

export const loadBoards = createAction('[Board] Load Boards');
export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: any[] }>()
);
export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: string }>()
);

export const moveTaskToColumn = createAction(
  '[Board] Move Task to Column',
  props<{ task: any }>()
);
