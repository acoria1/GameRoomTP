import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaCrackComponent } from './trivia-crack.component';

describe('TriviaCrackComponent', () => {
  let component: TriviaCrackComponent;
  let fixture: ComponentFixture<TriviaCrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaCrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaCrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
