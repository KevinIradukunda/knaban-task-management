import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddboardmodalComponent } from './addboardmodal.component';

describe('AddboardmodalComponent', () => {
  let component: AddboardmodalComponent;
  let fixture: ComponentFixture<AddboardmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddboardmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddboardmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
