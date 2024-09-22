import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themestate } from './model/theme.model';
import { isDarkModeEnabled } from './store/theme/theme.selector';
import { ThemeActions } from './store/theme/theme.action';
import { isSidebarVisible } from './store/sidebar/sidebar.selector';
import { Board } from './model/boardstate.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'knaban-taskmanagement';

  isDarkMode$: Observable<boolean>;
  isSidebarVisible: boolean = true;
  selectedBoard: Board | null = null;

  constructor(
    private store: Store<{ theme: { isDarkMode: boolean } }>,
    private cdr: ChangeDetectorRef
  ) {
    this.isDarkMode$ = this.store.select((state) => state.theme.isDarkMode);
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('isDarkMode');
    const isDarkMode = savedTheme ? JSON.parse(savedTheme) : false;

    this.store.dispatch(ThemeActions.setInitialTheme({ isDarkMode }));

    this.isDarkMode$.subscribe((isDark) => {
      localStorage.setItem('isDarkMode', JSON.stringify(isDark));

      this.cdr.detectChanges();
    });

    this.updateSidebarVisibility(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidebarVisibility(event.target.innerWidth);
  }

  private updateSidebarVisibility(screenWidth: number) {
    if (screenWidth < 768) {
      this.isSidebarVisible = false;
    } else {
      this.isSidebarVisible = true;
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  onBoardSelected(board: Board): void {
    this.selectedBoard = board;
  }
}
