import { createAction } from "@ngrx/store";
import { create } from "domain";

export const hideSidebar = createAction('[sidebar component] hide sidebar');
export const showSidebar =  createAction('[sidebar component] show sidebar');