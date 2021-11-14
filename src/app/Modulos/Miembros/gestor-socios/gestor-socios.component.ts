import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-gestor-socios',
  templateUrl: './gestor-socios.component.html',
  styleUrls: ['./gestor-socios.component.css']
})
export class GestorSociosComponent implements OnInit {

  persona = null;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos
      }
    );
  }
}
