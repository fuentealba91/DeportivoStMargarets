import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-menu-evento-deportivo',
  templateUrl: './menu-evento-deportivo.component.html',
  styleUrls: ['./menu-evento-deportivo.component.css']
})
export class MenuEventoDeportivoComponent implements OnInit {

  persona = null;
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos}
      );
  }
}
