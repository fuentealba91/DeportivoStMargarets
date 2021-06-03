import { Component, OnInit } from '@angular/core';
import { Deporte } from 'src/app/Modulos/Modelos/deporte';
import Swal from 'sweetalert2';
import { DeporteService } from '../../deporte.service';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.component.html',
  styleUrls: ['./deporte.component.css']
})
export class DeporteComponent implements OnInit {

  deporte = new Deporte();
  deportes = null;
  det = null;

  constructor(private deporteService: DeporteService) { }

  ngOnInit(): void
  {
    this.listarDeportes();
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => this.deportes = datos
    );
  }

  agregarDeporte() {
    if ((this.deporte.nombre != null) && (this.deporte.nombre != ''))
    {
      this.deporteService.agregarDeporte(this.deporte).subscribe
      (
        datos =>
        {
          if (datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'REGISTRO EXITOSO',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => {
              location.reload();
            })
          }
          else if (datos['respuesta'] == 2)
          {
            Swal.fire
            ({
              title: '',
              text: 'EL DEPORTE YA EXISTE',
              icon: 'error',
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
        text: 'DEBE INGRESAR EL NOMBRE',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }
}
