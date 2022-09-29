import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOnlyComponent } from './users-only.component';

describe('UsersOnlyComponent', () => {
  let component: UsersOnlyComponent;
  let fixture: ComponentFixture<UsersOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
