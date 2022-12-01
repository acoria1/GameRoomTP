import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaCrackWheelComponent } from './trivia-crack-wheel.component';

describe('TriviaCrackWheelComponent', () => {
  let component: TriviaCrackWheelComponent;
  let fixture: ComponentFixture<TriviaCrackWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaCrackWheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaCrackWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
