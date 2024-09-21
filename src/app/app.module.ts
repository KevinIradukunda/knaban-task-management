import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmptyboardComponent } from './components/emptyboard/emptyboard.component';
import { StoreModule } from '@ngrx/store';
import { sidebarReducer } from './store/sidebar/sidebar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { themeReducer } from './store/theme/theme.reducer';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { ColumnComponent } from './components/column/column.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { BoardEffects } from './store/boards/board.effect';
import { boardReducer } from './store/boards/board.reducer';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TaskpopupcardComponent } from './components/taskpopupcard/taskpopupcard.component';
import { taskPopupReducer } from './store/taskpopup/taskpopup.reducer';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    EmptyboardComponent,
    BoardsComponent,
    ColumnComponent,
    CreateTaskComponent,
    TaskpopupcardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      sidebar: sidebarReducer,
      theme: themeReducer,
      boards: boardReducer,
      taskPopup: taskPopupReducer,
    }),
    EffectsModule.forRoot([BoardEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
