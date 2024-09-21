import { createReducer, on } from '@ngrx/store';
import { closeTaskPopup, openTaskPopup } from './taskpopup.action';

export interface TaskPopupState {
  selectedTask: any | null;
  isPopupOpen: boolean;
}

export const initialState: TaskPopupState = {
  selectedTask: null,
  isPopupOpen: false,
};

export const taskPopupReducer = createReducer(
  initialState,
  on(openTaskPopup, (state, { task }) => ({
    ...state,
    selectedTask: task,
    isPopupOpen: true,
  })),
  on(closeTaskPopup, (state) => ({
    ...state,
    selectedTask: null,
    isPopupOpen: false,
  }))
);
