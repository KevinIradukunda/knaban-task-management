import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from '../../model/boardstate.model';

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const selectAllBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);
export const selectLoading = createSelector(
  selectBoardState,
  (state: BoardState) => state.loading
);
