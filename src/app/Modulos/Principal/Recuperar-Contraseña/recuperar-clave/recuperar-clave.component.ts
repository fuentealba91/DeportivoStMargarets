import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PersonaService } from 'src/app/Modulos/Miembros/persona.service';
import { Persona } from 'src/app/Modulos/Modelos/persona';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det: any;
  loginForm!: FormGroup
  
  constructor(private personaService: PersonaService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      correo: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
      confirm_password: new FormControl('', [Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")]),
    });
   }

  ngOnInit(): void
  {

  }

  validarClaves()
  {
    if(this.persona.clave == this.det)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  compararClaves()
  {
    if (this.loginForm.value.password != this.loginForm.value.confirm_password)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  cambiarClave()
  {
    if (this.loginForm.status != 'INVALID')
    {
      if (this.compararClaves())
      {
        this.persona.correo = (<HTMLInputElement>document.getElementById("correo")).value;
        this.persona.clave = (<HTMLInputElement>document.getElementById("clave")).value;

        this.personaService.cambiarClave(this.persona).subscribe
        (datos => {
          if (datos['respuesta'] == 1)
          {
            alert("Clave cambiada exitosamente");
            const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
              this.router.navigate([redirect]);
          }
          else
          {
            alert("Clave no cambiada");
          }
        })
      }
      else
      {
        alert("Las claves no coinciden");
      }
    }
    else
    {
      alert("Debe llenar todos los campos");
    }
  }
}
