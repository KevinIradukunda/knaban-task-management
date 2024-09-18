import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyboardComponent } from './emptyboard.component';

describe('EmptyboardComponent', () => {
  let component: EmptyboardComponent;
  let fixture: ComponentFixture<EmptyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
