import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format, validate } from 'rut.js';
import Swal from 'sweetalert2';
import { Persona } from '../../Modelos/persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  persona = null;
  editado = new Persona();
  loginForm!: FormGroup;
  url = "";
  rutValidated:boolean = true;
  submitted:boolean = false;

  archivo = 
  {
    nombre: "",
    nombreArchivo: "",
    base64textString: ""
  }

  constructor(private router: Router, private personaService: PersonaService, private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group({
      id: new FormControl(''),
      apodo: new FormControl(''),
      fotoPerfil: new FormControl(''),
      rut: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      segundo: new FormControl(''),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('',[Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      tEmergencia: new FormControl('', [Validators.required]),
      nacimiento: new FormControl('', [Validators.required]),
      comuna: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      // sexo: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }
    
    this.listarPerfil();
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos,
        console.log(this.persona)
      }
    );
  }

  formatRut()
  {
    this.rutValidated = validate(this.loginForm.value.rut);
    console.log(this.rutValidated);
    let rut = format(this.loginForm.value.rut);
    this.loginForm.patchValue({ rut });

    return this.rutValidated;
  }

  detallePersona()
  {
    this.loginForm.controls['id'].setValue(this.persona![0][0]);
    this.loginForm.controls['apodo'].setValue(this.persona![0][1]);
    // this.loginForm.controls['fotoPerfil'].setValue(this.persona![0][2]);
    this.loginForm.controls['rut'].setValue(this.persona![0][3]);
    this.loginForm.controls['nombre'].setValue(this.persona![0][4]);
    this.loginForm.controls['segundo'].setValue(this.persona![0][5]);
    this.loginForm.controls['paterno'].setValue(this.persona![0][6]);
    this.loginForm.controls['materno'].setValue(this.persona![0][7]);
    this.loginForm.controls['correo'].setValue(this.persona![0][8]);
    this.loginForm.controls['telefono'].setValue(this.persona![0][11]);
    this.loginForm.controls['tEmergencia'].setValue(this.persona![0][15]);
    this.loginForm.controls['nacimiento'].setValue(this.persona![0][11]);
    this.loginForm.controls['comuna'].setValue(this.persona![0][13]);
    this.loginForm.controls['direccion'].setValue(this.persona![0][14]);
    // this.loginForm.controls['sexo'].setValue(this.persona![0][16]);
  }

  editarPerfil()
  {
    if (this.loginForm.status != "INVALID")
    {
      if (this.archivo.nombreArchivo != "")
      {
        console.log(this.archivo);
        this.personaService.subirFoto(this.archivo).subscribe(
          datos => {
            if (datos == 1)
            {
              this.editado.id = this.loginForm.value.id;
              this.editado.apodo = this.loginForm.value.apodo;
              // this.editado.foto = this.archivo.nombreArchivo;
              this.editado.foto = this.archivo.base64textString;
              this.editado.rut = this.loginForm.value.rut;
              this.editado.nombre = this.loginForm.value.nombre;
              this.editado.sNombre = this.loginForm.value.segundo;
              this.editado.aPaterno = this.loginForm.value.paterno;
              this.editado.aMaterno = this.loginForm.value.materno;
              this.editado.correo = this.loginForm.value.correo;
              this.editado.telefono = this.loginForm.value.telefono;
              this.editado.tEmergencia = this.loginForm.value.tEmergencia;
              this.editado.fNacimiento = this.loginForm.value.nacimiento;
              this.editado.comuna = this.loginForm.value.comuna;
              this.editado.direccion = this.loginForm.value.direccion;
              // this.editado.sexo = this.loginForm.value.sexo;

              console.log(this.editado);

              this.personaService.editarPersona(this.editado).subscribe(
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
        this.editado.apodo = this.loginForm.value.apodo;
        this.editado.foto = this.archivo.nombreArchivo;
        this.editado.rut = this.loginForm.value.rut;
        this.editado.nombre = this.loginForm.value.nombre;
        this.editado.sNombre = this.loginForm.value.segundo;
        this.editado.aPaterno = this.loginForm.value.paterno;
        this.editado.aMaterno = this.loginForm.value.materno;
        this.editado.correo = this.loginForm.value.correo;
        this.editado.telefono = this.loginForm.value.telefono;
        this.editado.tEmergencia = this.loginForm.value.tEmergencia;
        this.editado.fNacimiento = this.loginForm.value.nacimiento;
        this.editado.comuna = this.loginForm.value.comuna;
        this.editado.direccion = this.loginForm.value.direccion;
        // this.editado.sexo = this.loginForm.value.sexo;

        console.log(this.editado);

        this.personaService.editarPersona(this.editado).subscribe(
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
    else
    {
      alert("ERROR");
    }
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
