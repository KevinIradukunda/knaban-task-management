import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskPopupState } from './taskpopup.reducer';

export const selectTaskPopupState =
  createFeatureSelector<TaskPopupState>('taskPopup');

export const selectSelectedTask = createSelector(
  selectTaskPopupState,
  (state: TaskPopupState) => state.selectedTask
);

export const selectIsPopupOpen = createSelector(
  selectTaskPopupState,
  (state: TaskPopupState) => state.isPopupOpen
);
