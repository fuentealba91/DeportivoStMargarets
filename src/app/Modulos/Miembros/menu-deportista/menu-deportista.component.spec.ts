import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeportistaComponent } from './menu-deportista.component';

describe('MenuDeportistaComponent', () => {
  let component: MenuDeportistaComponent;
  let fixture: ComponentFixture<MenuDeportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
