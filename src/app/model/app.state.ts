import { BoardState } from "../store/boards/board.reducer";
import { ThemeState } from "../store/theme/theme.reducer";

export interface AppState {
  theme: ThemeState;
  boards: BoardState;
}
