import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-menu-deporte',
  templateUrl: './menu-deporte.component.html',
  styleUrls: ['./menu-deporte.component.css']
})
export class MenuDeporteComponent implements OnInit {

  persona = null;

  constructor(private router: Router, private personaService: PersonaService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarPerfil();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos,
        console.log(this.persona)
      }
    );
  }
}
