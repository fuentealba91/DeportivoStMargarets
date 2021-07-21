import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Reunion } from '../../Modelos/reunion';
import { PersonaService } from '../persona.service';
import { ReunionService } from '../reunion.service';
import { TipoReunionService } from '../tipo-reunion.service';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {

  reunion = new Reunion();
  reuniones = null;
  personas = null;
  tipos = null;
  det = null;

  constructor(private personaService: PersonaService, private tipoService: TipoReunionService, private reunionService: ReunionService) { }

  ngOnInit(): void {
    this.listarPersona();
    this.listarTipoReuniones();
    this.listarReuniones();
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  listarTipoReuniones()
  {
    this.tipoService.listarTipoReunion().subscribe
    (
      (datos:any) => this.tipos = datos
    );
  }

  listarReuniones()
  {
    this.reunionService.listarReunion().subscribe
    (
      (datos: any) => this.reuniones = datos
    );
  }

  detalleReunionId(iden)
  {
    this.reunionService.detalleReunion(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  agendarReunion()
  {
    
    if ((this.reunion.fecha != undefined) && (this.reunion.lugar != null && this.reunion.lugar != '') && (this.reunion.puntos != null && this.reunion.puntos != '') && (this.reunion.encargado != null && this.reunion.encargado != 0) && (this.reunion.tipo != null && this.reunion.tipo != 0))
    {
      this.reunionService.agendarReunion(this.reunion).subscribe
      (
        datos =>
        {
          if (datos['respuesta'] == 1)
          {
            Swal.fire
              ({
                title: '',
                text: 'SOLICITUD ENVIADA',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado => {
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
        text: 'DEBE LLENAR TODOS LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }

  eliminarReunion(id)
  {
    this.reunionService.eliminarReunion(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'REUNIÓN ELIMINADA',
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
            text: 'REUNIÓN NO ELIMINADA',
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

  agregarAcuerdos()
  {
    var resultado = new Reunion();
    resultado.id = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    resultado.acuerdos = (<HTMLInputElement>document.getElementById("acuerdos")).value;

    if (resultado.acuerdos != "")
    {
      this.reunionService.agregarAcuerdos(resultado).subscribe(
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'ACUERDOS AGREGADOS',
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
              text: 'ACUERDOS NO AGREGADOS',
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
        text: 'EL ACUERDO NO PUEDE ESTAR VACÍO',
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
