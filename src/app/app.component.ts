import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { themestate } from './model/theme.model';
import { isDarkModeEnabled } from './store/theme/theme.selector';
import { enableDarkMode, enableLightMode } from './store/theme/theme.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'knaban-taskmanagement';
  // isDarkMode$: Observable<boolean>;

  // constructor(private store: Store<themestate>) {
  //   this.isDarkMode$ = this.store.select(isDarkModeEnabled); 
  // }


  // toggleTheme(isDarkMode: boolean) {
  //   let target = event.target as HTMLInputElement;
  //   const isChecked = target?.checked;
  //   if (isDarkMode) {
  //     this.store.dispatch(enableDarkMode());  
  //   } else {
  //     this.store.dispatch(enableLightMode());  
  //   }
  // }
}
