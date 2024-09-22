import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Board } from '../../model/boardstate.model';
import * as BoardActions from '../../store/boards/board.action';

export interface BoardState extends EntityState<Board> {
  activeBoardId: string | null;
}

export const boardAdapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  activeBoardId: null,
});

export const boardReducer = createReducer(
  initialBoardState,

  on(BoardActions.loadBoardsSuccess, (state, { boards }) => {
    return boardAdapter.setAll(boards, state);
  }),
  on(BoardActions.addBoard, (state, { board }) => {
    return boardAdapter.addOne(board, state);
  }),

  on(BoardActions.setActiveBoard, (state, { boardId }) => {
    return {
      ...state,
      activeBoardId: boardId,
    };
  }),

  on(BoardActions.addTask, (state, { boardName, task, newColIndex }) => {
    const board = Object.values(state.entities).find(
      (b) => b?.name === boardName
    );

    if (!board || !board.columns[newColIndex]) return state;

    const updatedColumns = board.columns.map((column, index) => {
      if (index === newColIndex) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    });

    const updatedBoard = {
      ...board,
      columns: updatedColumns,
    };

    return boardAdapter.updateOne(
      {
        id: board.id,
        changes: updatedBoard,
      },
      state
    );
  }),
  on(BoardActions.updateBoard, (state, { board }) => {
    return boardAdapter.updateOne(
      {
        id: board.id,
        changes: board,
      },
      state
    );
  }),

  on(
    BoardActions.setSubtaskCompleted,
    (state, { colIndex, taskIndex, subtaskIndex, isCompleted, subtaskId }) => {
      const activeBoard = state.entities[state.activeBoardId || ''];

      if (!activeBoard) return state;

      const updatedColumns = activeBoard.columns.map((column, cIndex) => {
        if (cIndex === colIndex) {
          const updatedTasks = column.tasks.map((task, tIndex) => {
            if (tIndex === taskIndex) {
              const updatedSubtasks = task.subtasks.map((subtask, sIndex) => {
                if (subtask.id === subtaskId) {
                  return { ...subtask, isCompleted };
                }
                return subtask;
              });

              return { ...task, subtasks: updatedSubtasks };
            }
            return task;
          });

          return { ...column, tasks: updatedTasks };
        }
        return column;
      });

      const updatedBoard = { ...activeBoard, columns: updatedColumns };

      return {
        ...state,
        entities: {
          ...state.entities,
          [activeBoard.id]: updatedBoard,
        },
      };
    }
  ),
  on(
    BoardActions.setSubtaskCompleted,
    (state, { colIndex, taskIndex, subtaskIndex, isCompleted, subtaskId }) => {
      const activeBoard = state.entities[state.activeBoardId || ''];

      if (!activeBoard) return state;

      const updatedColumns = activeBoard.columns.map((column, cIndex) => {
        if (cIndex === colIndex) {
          const updatedTasks = column.tasks.map((task, tIndex) => {
            if (tIndex === taskIndex) {
              const updatedSubtasks = task.subtasks.map((subtask, sIndex) => {
                if (subtask.id === subtaskId) {
                  return { ...subtask, isCompleted };
                }
                return subtask;
              });
              return { ...task, subtasks: updatedSubtasks };
            }
            return task;
          });
          return { ...column, tasks: updatedTasks };
        }
        return column;
      });

      const updatedBoard = { ...activeBoard, columns: updatedColumns };

      return {
        ...state,
        entities: {
          ...state.entities,
          [activeBoard.id]: updatedBoard,
        },
      };
    }
  ),

  on(
    BoardActions.setTaskStatus,
    (state, { colIndex, taskIndex, newStatus, boardId }) => {
      const board = state.entities[boardId || state.activeBoardId || ''];

      if (!board) return state;

      const taskToMove = board.columns[colIndex]?.tasks[taskIndex];
      if (!taskToMove) return state;

      const updatedTask = { ...taskToMove, status: newStatus };

      const updatedColumns = board.columns.map((column, columnIdx) => {
        if (columnIdx === colIndex) {
          return {
            ...column,
            tasks: column.tasks.filter((_, idx) => idx !== taskIndex),
          };
        }
        return column;
      });

      const targetColumnIdx = updatedColumns.findIndex(
        (column) => column.name.toLowerCase() === newStatus.toLowerCase()
      );

      if (targetColumnIdx === -1) {
        return state;
      }

    
      const finalColumns = updatedColumns.map((column, idx) => {
        if (idx === targetColumnIdx) {
          return {
            ...column,
            tasks: [...column.tasks, updatedTask],
          };
        }
        return column;
      });

      const updatedBoard = { ...board, columns: finalColumns };

      return {
        ...state,
        entities: {
          ...state.entities,
          [board.id]: updatedBoard,
        },
      };
    }
  )
);

export const {
  selectIds: selectBoardIds,
  selectEntities: selectBoardEntities,
  selectAll: selectAllBoards,
  selectTotal: selectBoardTotal,
} = boardAdapter.getSelectors();
