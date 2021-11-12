import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEventoDeportivoComponent } from './menu-evento-deportivo.component';

describe('MenuEventoDeportivoComponent', () => {
  let component: MenuEventoDeportivoComponent;
  let fixture: ComponentFixture<MenuEventoDeportivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEventoDeportivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEventoDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
