import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Actividad } from '../../Modelos/actividad';
import { DeporteService } from '../deporte.service';
import { EventoDeportivoService } from '../evento-deportivo.service';

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


  constructor(private eventoService: EventoDeportivoService, private deporteService: DeporteService) { }

  ngOnInit(): void
  {
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
}
