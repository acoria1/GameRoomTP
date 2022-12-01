import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAndJumpComponent } from './run-and-jump.component';

describe('RunAndJumpComponent', () => {
  let component: RunAndJumpComponent;
  let fixture: ComponentFixture<RunAndJumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunAndJumpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunAndJumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
