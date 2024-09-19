import { createReducer, on } from "@ngrx/store";
import { themestate } from "../../model/theme.model";
import { enableDarkMode, enableLightMode, putTheminlocalstorage } from "./theme.action";

function isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export const initialstate: themestate = {
  themeModeEnable: isLocalStorageAvailable() && localStorage.getItem('themeModeEnable') === 'true' || false,
};

export const themeReducer = createReducer(
  initialstate,
  on(enableDarkMode, (state) => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('darkModeEnabled', 'true');
    }
    return { ...state, themeModeEnable: true };
  }),
  on(enableLightMode, (state) => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('darkModeEnabled', 'false');
    }
    return { ...state, themeModeEnable: false };
  }),
  on(putTheminlocalstorage, (state) => {
    const isDarkMode = isLocalStorageAvailable() && localStorage.getItem('darkModeEnabled') === 'true';
    return { ...state, themeModeEnable: isDarkMode };
  })
);
