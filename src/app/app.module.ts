import { NgModule, isDevMode } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { sidebarReducer } from './store/sidebar/sidebar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { themeReducer } from './store/theme/theme.reducer';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';

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
import { AddtaskpopupComponent } from './components/addtaskpopup/addtaskpopup.component';
import { AddboardmodalComponent } from './components/addboardmodal/addboardmodal.component';
import { ThemeEffects } from './store/theme/theme.effect';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    BoardsComponent,
    TaskpopupcardComponent,
    AddtaskpopupComponent,
    AddboardmodalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      theme: themeReducer,
      boards: boardReducer,
    }),
    EffectsModule.forRoot([ThemeEffects, BoardEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
