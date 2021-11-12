import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoReunion } from '../../Modelos/tipo-reunion';
import { TipoReunionService } from '../tipo-reunion.service';

@Component({
  selector: 'app-tipo-reunion',
  templateUrl: './tipo-reunion.component.html',
  styleUrls: ['./tipo-reunion.component.css']
})
export class TipoReunionComponent implements OnInit {

  tipo = new TipoReunion();
  tipos = null;
  det = null;

  constructor(private tipoService: TipoReunionService) { }

  ngOnInit(): void 
  {
    this.listarTipoReuniones();
  }

  listarTipoReuniones()
  {
    this.tipoService.listarTipoReunion().subscribe
    (
      (datos:any) => this.tipos = datos
    );
  }

  agregarTipoReunion()
  {
    if ((this.tipo.descripcion == undefined)||(this.tipo.descripcion == ""))
    {
      Swal.fire
      ({
        title: '',
        text: 'EL CAMPO NO PUEDE ESTAR VACIO',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
    else
    {
      this.tipoService.AgregarTipoReunion(this.tipo).subscribe
        (
          datos => {
            if (datos['respuesta'] == 1) {
              Swal.fire
                ({
                  title: '',
                  text: 'TIPO DE REUNIÓN REGISTRADA',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
                .then(resultado => {
                  location.reload();
                })
            }
            else if(datos['respuesta'] == 2)
            {
              Swal.fire
              ({
                title: '',
                text: 'EL TIPO DE REUNIÓN YA EXISTE',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
              .then(resultado => {
                // location.reload();
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
  }

  detalleTipoReunionId(iden)
  {
    this.tipoService.detalleTipoReunion(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  modificarTipoReunion()
  {
    var modificado = new TipoReunion();
    modificado.idTipo = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    modificado.descripcion = (<HTMLInputElement>document.getElementById("desc")).value;

    if(modificado.descripcion == "")
    {
      Swal.fire
      ({
        title:'',
        text: 'EL CAMPO NO PUEDE ESTAR VACÍO',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
      .then(resultado =>
      {
        // location.reload();
      })
    }
    else
    {
      this.tipoService.modificarTipoReunion(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'TIPO DE REUNIÓN MODIFICADA',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado =>
            {
                location.reload();
            })
          }
          else if(datos['resultado'] == 2)
          {
            Swal.fire
            ({
              title: '',
              text: 'EL TIPO DE REUNIÓN YA EXISTENTE',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => 
            {
              // location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'TIPO DE REUNIÓN NO MODIFICADO',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado => 
            {
              // location.reload();
            })
          }
        }
      );
    }
  }

  eliminarTipoReunion(id)
  {
    this.tipoService.eliminarTipoReunion(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'TIPO DE REUNIÓN ELIMINADA',
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
            text: 'TIPO DE REUNIÓN NO ELIMINADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            // location.reload();
          })
        }
      }
    );
  }

  activarTipoReunion(tipo)
  {
    let modificado = new TipoReunion();
    modificado.idTipo = tipo;
    modificado.estado = 1;

    this.tipoService.modificarEstadoTipoReunion(modificado).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'TIPO DE REUNIÓN ACTIVADO',
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
            text: 'TIPO DE REUNIÓN NO ACTIVADO',
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

  desactivarTipoReunion(tipo)
  {
    let modificado = new TipoReunion();
    modificado.idTipo = tipo;
    modificado.estado = 0;

    console.log(modificado);

    this.tipoService.modificarEstadoTipoReunion(modificado).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'TIPO DE REUNIÓN DESACTIVADO',
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
            text: 'TIPO DE REUNIÓN NO DESACTIVADO',
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
