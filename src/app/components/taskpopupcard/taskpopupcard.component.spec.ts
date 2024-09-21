import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskpopupcardComponent } from './taskpopupcard.component';

describe('TaskpopupcardComponent', () => {
  let component: TaskpopupcardComponent;
  let fixture: ComponentFixture<TaskpopupcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskpopupcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskpopupcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
