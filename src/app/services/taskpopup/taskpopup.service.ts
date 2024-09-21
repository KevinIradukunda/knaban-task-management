import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskpopupService {
  private isModalOpenSource = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpenSource.asObservable();

  private selectedTaskSource = new BehaviorSubject<any>(null);
  selectedTask$ = this.selectedTaskSource.asObservable();

  openTaskModal(task: any) {
    this.selectedTaskSource.next(task);
    this.isModalOpenSource.next(true);
  }

  closeTaskModal() {
    this.selectedTaskSource.next(null);
    this.isModalOpenSource.next(false);
  }
}
