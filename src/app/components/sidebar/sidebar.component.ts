import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { sidebarState } from '../../model/sidebar.model';
import { Store } from '@ngrx/store';
import { isSidebarVisible } from '../../store/sidebar/sidebar.selector';
import { hideSidebar, showSidebar } from '../../store/sidebar/sidebar.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  isVisible$: Observable<boolean>;

  constructor(private store: Store) {
    this.isVisible$ = this.store.select(isSidebarVisible);
  }

  hideSidebar() {
    this.store.dispatch(hideSidebar());
  }
  showSidebar() {
    this.store.dispatch(showSidebar());
  }
  
}