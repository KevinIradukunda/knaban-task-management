import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmptyboardComponent } from './components/emptyboard/emptyboard.component';
import { StoreModule } from '@ngrx/store';
import { sidebarReducer } from './store/sidebar/sidebar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { themeReducer } from './store/theme/theme.reducer';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    EmptyboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({sidebar: sidebarReducer, theme: themeReducer}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
