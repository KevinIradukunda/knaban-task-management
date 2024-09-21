import { createReducer, on } from '@ngrx/store';
import {
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
  moveTaskToColumn,
} from './board.action';
import { Board, BoardState, Column, Task } from '../../model/boardstate.model';

export const initialState: BoardState = {
  boards: [
    {
      name: 'Main Board',
      columns: [
        {
          name: 'Todo',
          tasks: [{ id: '1', title: 'Task 1', status: 'Todo', subtasks: [] }],
        },
        { name: 'Doing', tasks: [] },
        { name: 'Done', tasks: [] },
      ],
    },
  ],
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
  })),
  on(moveTaskToColumn, (state, { task }) => {
    return {
      ...state,
      boards: state.boards.map((board: Board) => {
        const updatedColumns = board.columns.map((column: Column) => {
          const updatedTasks = column.tasks.filter((t) => t.id !== task.id);

          if (column.name === task.status) {
            updatedTasks.push(task);
          }

          return { ...column, tasks: updatedTasks };
        });

        return { ...board, columns: updatedColumns };
      }),
    };
  })
);
