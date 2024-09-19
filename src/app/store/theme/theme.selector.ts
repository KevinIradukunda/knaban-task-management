import { createFeatureSelector, createSelector } from '@ngrx/store';
import { themestate } from '../../model/theme.model';



export const selectThemeState = createFeatureSelector<themestate>('theme');


export const isDarkModeEnabled = createSelector(
  selectThemeState,
  (state: themestate) => state.themeModeEnable
);
