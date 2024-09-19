import { createAction } from "@ngrx/store";

export const enableDarkMode = createAction('[app component] enabledarkmode');
export const enableLightMode = createAction('[app component] enable light mode');
export const putTheminlocalstorage = createAction('[app components] load them in localstorage');