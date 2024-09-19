import { createReducer, on } from '@ngrx/store';
import {
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
} from './board.action';
import { BoardState } from '../../model/boardstate.model';

export const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
};

export const boardReducer = createReducer(
  initialState,
  on(loadBoards, (state) => ({ ...state, loading: true })),
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    loading: false,
    boards,
  })),
  on(loadBoardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
