import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-mantenedor-directiva',
  templateUrl: './mantenedor-directiva.component.html',
  styleUrls: ['./mantenedor-directiva.component.css']
})
export class MantenedorDirectivaComponent implements OnInit {

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
