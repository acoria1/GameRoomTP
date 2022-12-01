import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaCrackPanelComponent } from './trivia-crack-panel.component';

describe('TriviaCrackPanelComponent', () => {
  let component: TriviaCrackPanelComponent;
  let fixture: ComponentFixture<TriviaCrackPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaCrackPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaCrackPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
