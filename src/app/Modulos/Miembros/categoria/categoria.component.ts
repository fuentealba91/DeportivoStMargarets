import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Deporte } from 'src/app/Modulos/Modelos/deporte';
import Swal from 'sweetalert2';
import { Categoria } from '../../Modelos/categoria';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria = new Categoria();
  deporte = new Categoria();
  deportes = null;
  det = null;
  categorias = null;
  loginForm!: FormGroup;
  cat = null;
  submitted:boolean = false;
 
  constructor(private categoriaService: CategoriaService, private formBuilder: FormBuilder, private deporteService: DeporteService) { 
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
      deporte: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.listarCategorias();
    this.listarDeportes();
  }
  listarCategorias()
  {
    this.categoriaService.listarCategorias().subscribe
    (
      (datos:any) => this.categorias = datos
    );
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => this.deportes = datos
    );
  }

  detalleCategoriaId(iden)
  {
    this.categoriaService.detalleCategoria(iden).subscribe
    (
      (datos:any) => this.cat = datos
    );
  }

  agregarCategoria() {
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else
    {
      if (this.loginForm.status != 'INVALID')
      {
        this.categoria.nombre = this.loginForm.value.nombre;
        this.categoria.genero = this.loginForm.value.genero;
        this.categoria.edad = this.loginForm.value.edad;
        this.categoria.cupo = this.loginForm.value.cupo;
        this.categoria.id_deporte = this.loginForm.value.deporte;
        this.categoriaService.agregarCategoria(this.categoria).subscribe
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

  modificarCategoria()
  {
    var modificado = new Categoria();
    modificado.id = parseInt((<HTMLInputElement>document.getElementById("id")).value);
    modificado.nombre = (<HTMLInputElement>document.getElementById("desc")).value;
    modificado.genero = (<HTMLInputElement>document.getElementById("genero")).value;
    modificado.edad = (<HTMLInputElement>document.getElementById("edad")).value;
    modificado.cupo = (<HTMLInputElement>document.getElementById("cupo")).value;

    if(modificado.nombre == "")
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
      this.categoriaService.modificarCategoria(modificado).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'DEPORTE MODIFICADO',
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
              text: 'DEPORTE NO MODIFICADO',
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

  eliminarCategoria(id)
  {
    this.categoriaService.eliminarCategoria(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'CATEGORIA ACTUALIZADA',
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
            text: 'CATEGORIA NO ELIMINADO',
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

  eliminarCategoria2(id)
  {
    this.categoriaService.eliminarCategoria2(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'CATEGORIA ACTUALIZADA',
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
            text: 'CATEGORIA NO ELIMINADA',
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

  // asignarDeporte()
  // {
  //   this.deporteService.asignarDeporte(this.deporte).subscribe
  //       (
  //         datos =>
  //         {
  //           if (datos['respuesta'] == 1)
  //           {
  //             Swal.fire
  //               ({
  //                 title: '',
  //                 text: 'ROL ASIGNADO',
  //                 icon: 'success',
  //                 confirmButtonText: 'Aceptar',
  //                 showConfirmButton: true
  //               })
  //               .then(resultado =>
  //               {
  //                 location.reload();
  //               })
  //           }
  //           else
  //           {
  //             Swal.fire
  //               ({
  //                 title: '',
  //                 text: 'ROL YA ASIGNADO',
  //                 icon: 'error',
  //                 confirmButtonText: 'Aceptar',
  //                 showConfirmButton: true
  //               })
  //           }
  //         }
  //       );
  // }
}
