import { createAction, props } from '@ngrx/store';

export const openTaskPopup = createAction(
  '[Task] Open Task Popup',
  props<{ task: any }>()
);
export const closeTaskPopup = createAction('[Task] Close Task Popup');
