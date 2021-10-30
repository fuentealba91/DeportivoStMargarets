import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeporteComponent } from './registro-deporte.component';

describe('RegistroDeporteComponent', () => {
  let component: RegistroDeporteComponent;
  let fixture: ComponentFixture<RegistroDeporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDeporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
