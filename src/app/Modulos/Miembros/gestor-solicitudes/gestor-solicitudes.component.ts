import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-gestor-solicitudes',
  templateUrl: './gestor-solicitudes.component.html',
  styleUrls: ['./gestor-solicitudes.component.css']
})
export class GestorSolicitudesComponent implements OnInit {

  persona = null;
  deportistas:any[] = [];
  deportista = new PersonaCategoria();

  constructor(private personaService: PersonaService, private deporteService: DeporteService) { }

  ngOnInit(): void {
    this.listarPerfil();
    this.listarDeportistasPendientes();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => this.persona = datos
    );
  }

  listarDeportistasPendientes()
  {
    this.deporteService.listarDeportistas().subscribe
    (
      (datos: any) => {
        console.log(datos);
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado == 0)
          {
            this.deportistas.push(datos[i]);
          }
        }
      }
    );
  }

  aceptarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 1;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA ACEPTADO',
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
            text: 'DEPORTISTA NO ACEPTADO',
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

  rechazarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 2;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA RECHAZADO',
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
            text: 'DEPORTISTA NO RECHAZADO',
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
