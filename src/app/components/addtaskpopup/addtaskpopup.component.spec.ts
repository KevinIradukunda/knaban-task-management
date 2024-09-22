import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskpopupComponent } from './addtaskpopup.component';

describe('AddtaskpopupComponent', () => {
  let component: AddtaskpopupComponent;
  let fixture: ComponentFixture<AddtaskpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtaskpopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtaskpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
