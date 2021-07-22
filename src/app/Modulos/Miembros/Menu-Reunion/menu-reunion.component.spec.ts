import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReunionComponent } from './menu-reunion.component';

describe('MenuReunionComponent', () => {
  let component: MenuReunionComponent;
  let fixture: ComponentFixture<MenuReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
