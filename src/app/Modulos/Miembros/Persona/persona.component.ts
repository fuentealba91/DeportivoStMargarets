import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Persona } from '../../Modelos/persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  persona = new Persona();
  personas = null;
  det = null;
  modificada = new Persona();

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void 
  {
    this.listarPersona();
    this.validarCampos();
  }

  validarCampos()
  {
    (function () 
    {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) 
          {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  detallePersona(iden)
  {
    this.personaService.detallePersona(iden).subscribe
    (
        (datos: any) => this.det = datos
    );
  }

  validarPersona()
  {
    if (this.persona.rut != null && this.persona.rut != '' && this.persona.rut != undefined)
    {
      if (this.persona.nombre != null && this.persona.nombre != '' && this.persona.nombre != undefined)
      {
        if (this.persona.aPaterno != null && this.persona.aPaterno != '' && this.persona.aPaterno != undefined)
        {
          if (this.persona.aMaterno != null && this.persona.aMaterno != '' && this.persona.aMaterno != undefined)
          {
            if (this.persona.correo != null && this.persona.correo != '' && this.persona.correo != undefined)
            {
              if (this.persona.telefono != null && this.persona.telefono != '' && this.persona.telefono != undefined)
              {
                if (this.persona.tEmergencia != null && this.persona.tEmergencia != '' && this.persona.tEmergencia != undefined)
                {
                  if (this.persona.fNacimiento != null && this.persona.fNacimiento != undefined)
                  {
                    if (this.persona.comuna != null && this.persona.comuna != '' && this.persona.comuna != undefined)
                    {
                      if (this.persona.direccion != null && this.persona.direccion != '' && this.persona.direccion != undefined)
                      {
                        if (this.persona.sexo != null && this.persona.sexo != '' && this.persona.sexo != undefined)
                        {
                          return true;
                        }
                        else
                        {
                          return false;
                        }
                      }
                      else
                      {
                        return false;
                      }
                    }
                    else
                    {
                      return false;
                    }
                  }
                  else
                  {
                    return false;
                  }
                }
                else
                {
                  return false;
                }
              }
              else
              {
                return false;
              }
            }
            else
            {
              return false;
            }
          }
          else
          {
            return false;
          }
        }
        else
        {
          return false;
        }
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  agregarPersona()
  {
    if (this.validarPersona() == true)
    {
      this.personaService.agregarPersona(this.persona).subscribe
      (
        datos =>
        {
          if (datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'PERSONA AGREGADA',
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
              text: 'PERSONA NO AGREGADA',
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
        text: 'DEBE LLENAR LOS CAMPOS',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: true
      })
    }
  }

  eliminarPersona(id)
  {
    this.personaService.eliminarPersona(id).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'PERSONA ELIMINADA',
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
            text: 'PERSONA NO ELIMINADA',
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

  editarPersona()
  {
    var ide = (<HTMLInputElement>document.getElementById("mId")).value;
    var rut = (<HTMLInputElement>document.getElementById("mRut")).value;
    var nom = (<HTMLInputElement>document.getElementById("mNombre")).value;
    var pat = (<HTMLInputElement>document.getElementById("mPaterno")).value;
    var mat = (<HTMLInputElement>document.getElementById("mMaterno")).value;
    var cor = (<HTMLInputElement>document.getElementById("mCorreo")).value;
    var tel = (<HTMLInputElement>document.getElementById("mTelefono")).value;
    var eme = (<HTMLInputElement>document.getElementById("mEmergencia")).value;
    var nac = (<HTMLInputElement>document.getElementById("mNacimiento")).value;
    var com = (<HTMLInputElement>document.getElementById("mComuna")).value;
    var dir = (<HTMLInputElement>document.getElementById("mDireccion")).value;
    // var sex = 'F';
    var sex = (<HTMLInputElement>document.getElementById("mSexo")).value;


    if((ide!="")&&(rut!="")&&(nom!="")&&(pat!="")&&(mat!="")&&(cor!="")&&(tel!="")&&(eme!="")&&(nac!="")&&(com!="")&&(dir!="")&&(sex!=""))
    {
      this.personaService.editarPersona(ide, rut, nom, pat, mat, cor, tel, eme, nac, com, dir, sex).subscribe
      (
        datos =>
        {
          if (datos['resultado'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'PERSONA MODIFICADA',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
            .then(resultado =>
            {
              location.reload();
            })
          }
          else if (datos['resultado'] == 2)
          {
            Swal.fire
            ({
              title: '',
              text: 'RUT Y/O CORREO YA EXISTEN',
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
              text: 'PERSONA NO MODIFICADA',
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
        title: '',
        text: 'DEBE LLENAR TODOS LOS CAMPOS',
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
