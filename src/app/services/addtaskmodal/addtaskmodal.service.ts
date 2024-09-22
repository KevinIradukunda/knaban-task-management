import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddtaskmodalService {
 private isModalOpenSource = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpenSource.asObservable();

  opentaskaddModal() {
    this.isModalOpenSource.next(true);
  }

  closetaskaddModal() {
    this.isModalOpenSource.next(false);
  }
}
