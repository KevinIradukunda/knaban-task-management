import { State, createFeatureSelector, createSelector } from "@ngrx/store";
import { sidebarState } from "../../model/sidebar.model";

export const selectSidebarState = createFeatureSelector<sidebarState>('sidebar');
export const isSidebarVisible = createSelector(
    selectSidebarState,
    (state:sidebarState) => state.visible
);