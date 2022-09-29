import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolDefeatDialogComponent } from './hol-defeat-dialog.component';

describe('HolDefeatDialogComponent', () => {
  let component: HolDefeatDialogComponent;
  let fixture: ComponentFixture<HolDefeatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolDefeatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolDefeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
