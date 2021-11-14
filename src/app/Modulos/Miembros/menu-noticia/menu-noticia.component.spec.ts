import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNoticiaComponent } from './menu-noticia.component';

describe('MenuNoticiaComponent', () => {
  let component: MenuNoticiaComponent;
  let fixture: ComponentFixture<MenuNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuNoticiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
