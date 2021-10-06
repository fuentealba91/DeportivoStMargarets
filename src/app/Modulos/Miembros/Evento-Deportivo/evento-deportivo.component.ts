import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Actividad } from '../../Modelos/actividad';
import { DeporteService } from '../deporte.service';
import { EventoDeportivoService } from '../evento-deportivo.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-evento-deportivo',
  templateUrl: './evento-deportivo.component.html',
  styleUrls: ['./evento-deportivo.component.css']
})
export class EventoDeportivoComponent implements OnInit {

  actividades = null;
  tipos = null;
  deportes = null;
  actividad = new Actividad();
  det = null;


  constructor(private router: Router, private personaService: PersonaService, private eventoService: EventoDeportivoService, private deporteService: DeporteService) { }

  ngOnInit(): void
  {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }
    
    this.listarEventos();
    this.listarDeportes();
    this.listarTipoActividad();
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => this.deportes = datos
    );
  }

  listarTipoActividad()
  {
    this.deporteService.listarTipoActividad().subscribe
    (
      (datos:any) => this.tipos = datos
    );
  }

  listarEventos()
  {
    this.deporteService.listarEventos().subscribe
    (
      (datos:any) => this.actividades = datos
    );
  }

  detalleEventoId(iden)
  {
    this.deporteService.detalleEventoDeportivo(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  agregarEventoDeportivo() {
    if ((this.actividad.fecha != null) && (this.actividad.lugar != null && this.actividad.lugar != '') && (this.actividad.categoria != null && this.actividad.categoria != '') && (this.actividad.objetivo != null && this.actividad.objetivo != '') && (this.actividad.deporte != null && this.actividad.deporte != 0) && (this.actividad.tipoActividad != null && this.actividad.tipoActividad != 0))
    {
      this.deporteService.agregarEventoDeportivo(this.actividad).subscribe
        (
          datos => {
            if (datos['respuesta'] == 1) {
              Swal.fire
                ({
                  title: '',
                  text: 'EVENTO CREADO',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
                  location.reload();
                })
            }
            else if (datos['respuesta'] == 2) {
              Swal.fire
                ({
                  title: '',
                  text: 'EL EVENTO YA EXISTE',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
                  location.reload();
                })
            }
            else {
              Swal.fire
                ({
                  title: '',
                  text: 'ERROR AL ENVIAR LA SOLICITUD',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
            }
          }
        )
    }
    else
    {
      Swal.fire
      ({
        title: '',
        text: 'SE DEBEN LLENAR TODOS LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }

  eliminarEventoDeportivo(id)
  {
    this.deporteService.eliminarEventoDeportivo(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'EVENTO ELIMINADO',
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
            text: 'EVENTO NO ELIMINADO',
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

  agregarResultado()
  {
    var resultado = new Actividad();
    resultado.idActividad = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    resultado.resultado = (<HTMLInputElement>document.getElementById("result")).value;

    if (resultado.resultado != "")
    {
      this.deporteService.agregarResultado(resultado).subscribe(
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'RESULTADO AGREGADO',
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
              text: 'RESULTADO NO AGREGADO',
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
      )
    }
    else
    {
      Swal.fire
      ({
        title:'',
        text: 'EL RESULTADO NO PUEDE ESTAR VACÍO',
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
}
