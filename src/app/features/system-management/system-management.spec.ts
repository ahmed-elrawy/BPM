import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemManagement } from './system-management';

describe('SystemManagement', () => {
  let component: SystemManagement;
  let fixture: ComponentFixture<SystemManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
