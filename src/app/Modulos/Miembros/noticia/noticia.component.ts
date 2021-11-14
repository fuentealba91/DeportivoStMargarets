import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../persona.service';
import { Noticias } from '../../Modelos/noticias';
import { NoticiasService } from '../../Principal/noticias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  noticia = new Noticias();
  noticias = null;
  rolAdmin = sessionStorage.getItem("rolAdmin") || null;
  rolSecretario = sessionStorage.getItem("rolSecretario") || null;
  perfil = null;
  det:any[] = [];
  loginForm!: FormGroup;
  agregarForm!: FormGroup;
  submitted:boolean = false;
  editado = new Noticias();
  deta = null;

  archivo = 
  {
    nombre: "",
    nombreArchivo: "",
    base64textString: ""
  }
  

  constructor(private router: Router, private personaService: PersonaService, private noticiasService: NoticiasService, private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({
      id: new FormControl(''),
      titulo: new FormControl('', [Validators.required]),
      imagen: new FormControl(''),
      descripcion: new FormControl('', [Validators.required]),
    });

    this.agregarForm = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    if((sessionStorage.getItem("rolAdmin") == null)&&(sessionStorage.getItem("rolSecretario") == null))
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/menu-principal';
      this.router.navigate([redirect]);
    }

    this.listarNoticias();
    this.listarPerfil();
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => this.perfil = datos
      );
    
  }

  listarNoticias()
  {
    this.noticiasService.listarNoticias().subscribe
    (
      (datos:any) => this.noticias = datos
    );
  }

  detalleNoticiaId(iden)
  {
    this.noticiasService.detalleNoticia(iden).subscribe
    (
      (datos:any) => {this.deta = datos, console.log(datos)}
    );
  }

  detalleNoticia(iden)
  {
    this.noticiasService.detalleNoticia(iden).subscribe
    (
        (datos: any) => 
        {
          console.log(datos);
          this.det = datos
          // let primera = new Date(datos[0].f_nacimiento);
           // primera.setHours(primera.getHours() - 3);
          // let dia = primera.toISOString();
          // let fecha = dia.substring(0,dia.length - 14);
          // console.log("FECHA ",fecha);
          this.loginForm.controls['id'].setValue(datos[0].idNoticia);
          this.loginForm.controls['titulo'].setValue(datos[0].titulo);
          this.loginForm.controls['descripcion'].setValue(datos[0].descripcion);
          
        }
    );
  }

  editarNoticia()
  {
    this.submitted = true;
    if (this.loginForm.status != "INVALID")
    { 
        if (this.archivo.nombreArchivo != "")
        {
          console.log(this.archivo);
          this.noticiasService.subirFoto(this.archivo).subscribe(
            datos => {
              if (datos == 1)
              {
                this.editado.id = this.loginForm.value.id;
                this.editado.titulo = this.loginForm.value.titulo;
                this.editado.imagen = this.archivo.base64textString;
                this.editado.descripcion = this.loginForm.value.descripcion;

                console.log(this.editado);

                this.noticiasService.editarNoticia(this.editado).subscribe(
                  datos => {
                    if (datos['resultado'] == 1) {
                      Swal.fire
                      ({
                        title: '',
                        text: 'PERFIL MODIFICADO',
                        icon: 'success',
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
                        text: 'PERFIL NO MODIFICADO',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        showConfirmButton: true
                      })
                    }
                  }
                )
              }
            }
          )
        }
        else
        {
          this.editado.id = this.loginForm.value.id;
          this.editado.titulo = this.loginForm.value.titulo;
          this.editado.imagen = this.archivo.nombreArchivo;
          this.editado.descripcion = this.loginForm.value.descripcion;

          console.log(this.editado);

          this.noticiasService.editarNoticia(this.editado).subscribe(
            datos => {
              if (datos['resultado'] == 1) {
                Swal.fire
                ({
                  title: '',
                  text: 'PERFIL MODIFICADO',
                  icon: 'success',
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
                  text: 'PERFIL NO MODIFICADO',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
              }
            }
          )
        }
      
    }
  }

  eliminarNoticia(id)
  {
    this.noticiasService.eliminarNoticia(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTE ACTUALIZADO',
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
            text: 'DEPORTE NO ELIMINADO',
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

  eliminarNoticia2(id)
  {
    this.noticiasService.eliminarNoticia2(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTE ACTUALIZADO',
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
            text: 'DEPORTE NO ELIMINADO',
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

  seleccionarArchivo(event) 
  {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) 
    {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) 
  {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

}
