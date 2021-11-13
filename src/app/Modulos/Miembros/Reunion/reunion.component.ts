import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonaReunion } from '../../Modelos/persona-reunion';
import { Reunion } from '../../Modelos/reunion';
import { DirectivaService } from '../directiva.service';
import { PersonaService } from '../persona.service';
import { ReunionService } from '../reunion.service';
import { RolService } from '../rol.service';
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
  tipos: any[] = [];
  det: any[] = [];
  loginForm!: FormGroup;
  resultadoForm!: FormGroup;
  persona = null;
  submitted:boolean = false;
  date: Date = new Date();
  flag:boolean = false;
  asociados:any[] = [];
  invitacion = new PersonaReunion();
  reunionMayor = 0;
  confirmados:any[] = [];
  directivas:any[] = [];
  cargo:boolean = false;
  cargoSecretario:boolean = false;

  constructor(
    private personaService: PersonaService, 
    private tipoService: TipoReunionService, 
    private reunionService: ReunionService,
    private directivaService: DirectivaService,
    private router: Router,
    private rolService: RolService,
    private formBuilder: FormBuilder) 
    {
      this.loginForm = this.formBuilder.group({
        fecha: new FormControl('',Validators.required),
        lugar: new FormControl('',Validators.required),
        puntos: new FormControl('',Validators.required),
        encargado: new FormControl('',Validators.required),
        tipo: new FormControl('',Validators.required)
      })
      this.resultadoForm = this.formBuilder.group({
        reunion: new FormControl('',Validators.required),
        fecha: new FormControl('',Validators.required),
        puntos: new FormControl('',Validators.required),
        acuerdo: new FormControl(''),
      })
    }

  ngOnInit(): void {
    this.listarPersona();
    this.listarTipoReuniones();
    this.listarReuniones();
    this.listarDirectivas();
    this.listarPerfil();
  }

  listarInvitadosConfirmados(id)
  {
    this.reunionService.listarInvitadosConfirmados(id).subscribe(
      (datos:any) => 
      {
        console.log("DATOS ",datos);
        for(let i=0; i<datos.length; i++)
        {
          if(datos[i].asistio != 2 && datos[i].asistio != 0)
          {
            this.confirmados.push(datos[i]);
          }
        }
      }
    )
  }

  listarMiembrosAsociados()
  {
    this.rolService.listarRolAsignado().subscribe
    (
      (datos:any) => 
      {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if((datos[i].id_rol == 1) || (datos[i].id_rol == 2))
            {
              this.asociados.push(datos[i]);
            }
          }

          this.invitarReunion();
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'NO EXISTEN MIEMBROS A INVITAR',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          }).then(resultado => {
            this.listarReuniones();
            location.reload();
          })
        }
      }
    )
  }

  listarPerfil()
  {
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
    (
      (datos: any) => {
        this.persona = datos
      }
    );
  }

  listarPersona()
  {
    this.personaService.listarPersona().subscribe
    (
      (datos: any) => this.personas = datos
    );
  }

  listarDirectivas()
  {
    this.directivaService.listarDirectivas().subscribe
    (
      (datos:any) => 
      {
        let id: number = parseInt(sessionStorage.getItem("id") || '{}');
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].cargo == 'presidente' || datos[i].cargo == 'secretario')
          {
            this.directivas.push(datos[i]);
          }
        }

        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].cargo == 'presidente')
          {
            if(datos[i].id_Persona == id)
            {
              this.cargo = true;
            }
          }
          else
          {
            if(this.cargo == false)
            {
              if(datos[i].cargo == 'secretario')
              {
                if(datos[i].id_Persona == id)
                {
                  this.cargo = true;
                }
              }
            }
          }
        }

        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].cargo == 'secretario')
          {
            if(datos[i].id_Persona == id)
            {
              this.cargoSecretario = true;
            }
          }
        }
      }
    )
  }

  listarTipoReuniones()
  {
    this.tipoService.listarTipoReunion().subscribe
    (
      (datos:any) => {
        if(datos)
        {
          for(let i=0;i<datos.length;i++)
          {
            if(datos[i].estado != 0)
            {
              this.tipos.push(datos[i]);
            }
          }
        }
      }
    );
  }

  listarReuniones()
  {
    this.reunionService.listarReunion().subscribe
    (
      (datos: any) => 
      {
        if(datos)
        {
          this.reuniones = datos
          let numero = 0;
          for(let i=0;i<datos.length;i++)
          {
            if(Number(datos[i].idReunion) > numero)
            {
              this.reunionMayor = datos[i].idReunion;
              numero = datos[i].idReunion;
            }
          }
        }
      }
    );
  }

  detalleReunionId(iden)
  {
    this.reunionService.detalleReunion(iden).subscribe
    (
      (datos:any) => 
      {
        this.det = datos
        let primera = new Date(datos[0].fecha);
        primera.setHours(primera.getHours() - 3);
        let dia = primera.toISOString();
        // let dia = new Date(datos[0].fecha).toISOString();
        let fecha = dia.substring(0,dia.length - 8);
        console.log(dia);
        console.log(fecha);
        this.resultadoForm.controls['reunion'].setValue(datos[0].descripcion);
        this.resultadoForm.controls['fecha'].setValue(fecha);
        this.resultadoForm.controls['puntos'].setValue(datos[0].puntosTratar);
        this.resultadoForm.controls['acuerdo'].setValue(datos[0].acuerdos);
      }
    );
  }

  agendarReunion() 
  {
    this.submitted = true;

    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      if(this.loginForm.status != 'INVALID')
      {
        let fecha = new Date(this.loginForm.value.fecha);
        let comparar = new Date();
        comparar.setDate(comparar.getDate()+15);
        console.log(comparar);
        if(comparar < fecha)
        {
          this.flag = false;
          this.reunion.fecha = this.loginForm.value.fecha;
          this.reunion.lugar = this.loginForm.value.lugar;
          this.reunion.puntos = this.loginForm.value.puntos;
          this.reunion.encargado = this.loginForm.value.encargado;
          this.reunion.tipo = this.loginForm.value.tipo;

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
                    this.listarReuniones();
                    // this.listarMiembrosAsociados();
                  })
                  .then(resultado => {
                    setTimeout(() => {
                      this.listarMiembrosAsociados();
                    }, 100);
                    
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
          this.flag = true;
          console.log(this.flag);
        }
      }
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
    this.submitted = true;
    if(this.resultadoForm.invalid)
    {
      return;
    }
    else
    {
      if(this.resultadoForm.status != 'INVALID')
      {
        let fechaComparar = new Date(this.det![0][1]);
        let acuerdo = new Reunion();
        acuerdo.id = this.det![0][0];
        acuerdo.fecha = this.resultadoForm.value.fecha;
        acuerdo.puntos = this.resultadoForm.value.puntos;
        acuerdo.acuerdos = this.resultadoForm.value.acuerdo;

        if(acuerdo.puntos == this.det![0][3])
        {
          if(fechaComparar.getTime() == new Date(acuerdo.fecha).getTime())
          {
            this.reunionService.agregarAcuerdos(acuerdo).subscribe
            (
              datos =>
              {
                if (datos['resultado'] == 1)
                {
                  Swal.fire
                  ({
                    title: '',
                    text: 'REUNIÓN MODIFICADA',
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
                    text: 'REUNIÓN NO MODIFICADA',
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
            fechaComparar.setDate(fechaComparar.getDate()+1);

            if(fechaComparar.getTime() < new Date(acuerdo.fecha).getTime())
            {
              this.reunionService.agregarAcuerdos(acuerdo).subscribe
              (
                datos =>
                {
                  if (datos['resultado'] == 1)
                  {
                    Swal.fire
                    ({
                      title: '',
                      text: 'REUNIÓN MODIFICADA',
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
                      text: 'REUNIÓN NO MODIFICADA',
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
                text: 'LA FECHA DEBE SER UN DÍA MAYOR A LA ACTUAL',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
          }
        }
        else
        {
          if(fechaComparar.getTime() != new Date(acuerdo.fecha).getTime())
          {
            fechaComparar.setDate(fechaComparar.getDate()+2);

            if(fechaComparar.getTime() < new Date(acuerdo.fecha).getTime())
            {
              this.reunionService.agregarAcuerdos(acuerdo).subscribe
              (
                datos =>
                {
                  if (datos['resultado'] == 1)
                  {
                    Swal.fire
                    ({
                      title: '',
                      text: 'REUNIÓN MODIFICADA',
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
                      text: 'REUNIÓN NO MODIFICADA',
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
                text: 'LA FECHA DEBE SER DOS DÍAS MAYOR A LA ACTUAL',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showConfirmButton: true
              })
            }
            return;
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'LA FECHA DEBE SER DOS DÍAS MAYOR A LA ACTUAL',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            })
          }
        }
      }
    }
  }

  invitarReunion()
  {
    let result = 0;

    for(let i = 0; i<this.asociados.length; i++)
    {
      this.invitacion.idPersona = this.asociados[i].id_persona;
      this.invitacion.idReunion = this.reunionMayor;

      this.reunionService.invitarReunion(this.invitacion).subscribe(
        datos => 
        {
          if(datos['respuesta'] == 1)
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES ENVIADAS',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarReuniones();
              location.reload();
            })
          }
          else
          {
            Swal.fire
            ({
              title: '',
              text: 'INVITACIONES NO ENVIADAS',
              icon: 'error',
              confirmButtonText: 'Aceptar',
              showConfirmButton: true
            }).then(resultado => {
              this.listarReuniones();
              location.reload();
            })
          }
        }
      )
    }
    return result;
  }

  confirmarAsistencia(invitacion)
  {
    console.log(invitacion);
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 3;

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
      }
    );
  }

  rechazarAsistencia(invitacion)
  {
    this.invitacion.id = invitacion.id;
    this.invitacion.idPersona = invitacion.persona;
    this.invitacion.idReunion = invitacion.reunion;
    this.invitacion.asistio = 4;

    this.reunionService.modificarInvitacion(this.invitacion).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA REGISTRADA',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
        else
        {
          Swal.fire
          ({
            title: '',
            text: 'ASISTENCIA NO REGISTRADA',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
          .then(resultado =>
          {
            this.confirmados = [];
            this.listarInvitadosConfirmados(invitacion.reunion);
          })
        }
      }
    );
  }
}
