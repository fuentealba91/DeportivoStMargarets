import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Rol } from '../../Modelos/rol';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  rol = new Rol();
  roles = null;
  det = null;
  
  constructor(private rolService: RolService) { }

  ngOnInit(): void 
  {
    this.listarRoles();
  }

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => this.roles = datos
    );
  }

  validarCampo()
  {
    if((this.rol.descripcion == undefined)||(this.rol.descripcion == ''))
    {
      alert(this.rol.descripcion);
    }
  }

  agregarRol()
  {
    this.rolService.AgregarRol(this.rol).subscribe
    (
      datos=>
      {
        if(datos['respuesta'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'SOLICITUD ENVIADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            location.reload();
          })
        }
        else if(datos['respuesta'] == 2)
        {
          Swal.fire
          ({
            title: '',
            text: 'EL ROL YA EXISTE',
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

  detalleRolId(iden)
  {
    this.rolService.detalleRol(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }

  eliminarRol(id)
  {
    this.rolService.eliminarRol(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ROL ELIMINADO',
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
            text: 'ROL NO ELIMINADO',
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

  modificarRol()
  {
    var modificado = new Rol();
    modificado.id_rol = parseInt((<HTMLInputElement>document.getElementById("id")).value);
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
        location.reload();
      })
    }
    else
    {
      this.rolService.modificarRol(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'ROL MODIFICADO',
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
              text: 'EL ROL YA EXISTE',
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
              text: 'ROL NO MODIFICADO',
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
}
