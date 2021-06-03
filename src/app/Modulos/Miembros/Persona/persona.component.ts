import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Persona } from '../../Modelos/persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det = null;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void 
  {
    this.listarPersona();
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  detallePersona(iden)
  {
    this.personaService.detallePersona(iden).subscribe
    (
        (datos: any) => this.det = datos
    );
  }

  agregarPersona()
  {
    this.personaService.agregarPersona(this.persona).subscribe
    (
      datos=>
      {
        if(datos['respuesta'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA AGREGADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA NO AGREGADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      }
    )
  }

  eliminarPersona(id)
  {
    this.personaService.eliminarPersona(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA ELIMINADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA NO ELIMINADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
      }
    );
  }
}
