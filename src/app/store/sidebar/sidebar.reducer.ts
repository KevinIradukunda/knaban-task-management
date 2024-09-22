import { State, createReducer, on } from '@ngrx/store';
import { sidebarState } from '../../model/sidebar.model';
import { hideSidebar, showSidebar } from './sidebar.action';

export const initialState: sidebarState = {
  visible: true,
};

export const sidebarReducer = createReducer(
  initialState,
  on(hideSidebar, (state) => ({
    ...state,
    visible: false,
  })),
  on(showSidebar, (state) => ({
    ...state,
    visible: true,
  }))
);
