import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Contacto } from '../../Modelos/contacto';
import { ContactoService } from '../contacto.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit 
{

  contacto = new Contacto();
  loginForm!: FormGroup;

  /*loginForm= new FormGroup({
    nombre: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    asunto: new FormControl('',Validators.required),
    mensaje: new FormControl('',Validators.required),
    
  })*/

  // get nombre(){return this.loginForm.get('nombre')}
  // get email(){return this.loginForm.get('email')}
  // get phone(){return this.loginForm.get('phone')}
  // get asunto(){return this.loginForm.get('asunto')}
  // get mensaje(){return this.loginForm.get('mensaje')}



  constructor(private contactoService: ContactoService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      //email: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required, Validators.pattern("[0-9]{9}")]),
      asunto: new FormControl('',Validators.required),
      mensaje: new FormControl('',Validators.required),
    });
   }

  ngOnInit(): void 
  {

    // this.contacto.nombre = this.loginForm.get('nombre')?.value
    // (function () 
    // {
    //   'use strict'
    
    //   // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //   var forms = document.querySelectorAll('.needs-validation')
    
    //   // Loop over them and prevent submission
    //   Array.prototype.slice.call(forms)
    //     .forEach(function (form) {
    //       form.addEventListener('submit', function (event) 
    //       {
    //         if (!form.checkValidity()) {
    //           event.preventDefault()
    //           event.stopPropagation()
    //         }
    
    //         form.classList.add('was-validated')
    //       }, false)
    //     })
    // })()
    // this.loginForm = this.formBuilder.group({
    //   nombre: new FormControl('',Validators.required),
    //   email: new FormControl('',Validators.required),
    //   //email: new FormControl('',Validators.email),
    //   phone: new FormControl('',Validators.required),
    //   asunto: new FormControl('',Validators.required),
    //   mensaje: new FormControl('',Validators.required),
    // });
  }

  Enviar()
  {
    if(this.loginForm.status != 'INVALID')
    {
      this.contacto.nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
      this.contacto.correo = (<HTMLInputElement>document.getElementById("correo")).value;
      this.contacto.telefono = parseInt((<HTMLInputElement>document.getElementById("telefono")).value);
      this.contacto.asunto = (<HTMLInputElement>document.getElementById("asunto")).value;
      this.contacto.mensaje = (<HTMLInputElement>document.getElementById("mensaje")).value;
      //console.log(this.contacto);
      this.contactoService.EnviarMensaje(this.contacto).subscribe
        (
          datos =>
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
        );
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
}
