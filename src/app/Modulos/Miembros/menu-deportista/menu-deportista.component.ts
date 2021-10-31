import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { RolPersona } from '../../Modelos/rol-persona';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';
import { RolService } from '../rol.service';

@Component({
  selector: 'app-menu-deportista',
  templateUrl: './menu-deportista.component.html',
  styleUrls: ['./menu-deportista.component.css']
})
export class MenuDeportistaComponent implements OnInit {

  loginForm!: FormGroup;
  asignar = new RolPersona();
  asignarCategoria = new PersonaCategoria();
  roles:any[] = [];
  deportes = null;
  categorias = null;
  cat = null;
  persona = null;
  deportesActivos:any[] = [];
  categoriasActivas:any[] = [];
  date: Date = new Date();
  fecha: Date = new Date();
  años = 0;

  constructor(private formBuilder: FormBuilder, private rolService: RolService, private personaService: PersonaService, private deporteService: DeporteService, private categoriaService: CategoriaService) 
  {
    this.loginForm = this.formBuilder.group({
      nombre: new FormControl('',Validators.required),
      genero: new FormControl('',Validators.required),
      edad: new FormControl('',Validators.required),
      cupo: new FormControl('',Validators.required),
      deporte: new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    this.listarDeportes();
    this.listarPerfil();
    this.listarRoles();
  }

  listarPerfil()
  {
    
    let id: number = parseInt(sessionStorage.getItem("id") || '{}');
    this.personaService.detallePersona(id).subscribe
      (
        (datos: any) => {this.persona = datos
        this.fecha = new Date(this.persona![0][12])
        this.fecha.setDate(this.fecha.getDate() + 1);
        this.años = this.date.getFullYear() - this.fecha.getFullYear();
        }
      );
  }

  listarRoles()
  {
    this.rolService.listarRoles().subscribe
    (
      (datos:any) => {
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].descripcion == 'Deportista')
          {
            this.roles.push(datos[i]);
          }
        }
      }
    );
  }

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => {this.deportes = datos;
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado == 1)
          {
            this.deportesActivos.push(datos[i]);
          }
        }
      }
    );
  }

  detalleCategoriaId(iden)
  {
    this.categoriaService.detalleCategoria(iden).subscribe
    (
      (datos: any) => {this.cat = datos}
    );
  }

  listarCategoriaPorDeporte(id)
  {
    this.categoriaService.listarCategoriaPorDeporte(id).subscribe
    (
      (datos:any) => {this.categorias = datos;
        this.categoriasActivas = [];
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado == 1)
          {
            if(datos[i].edad >= 18 && this.años >= 18)
            {
              this.categoriasActivas.push(datos[i]);
            }
            else if(datos[i].edad >= this.años)
            {
              this.categoriasActivas.push(datos[i]);
            }
          }
        }
      }
    );
  }

  asignarRolyDeporte()
  {
    this.asignar.idPersona = this.persona![0][0];
    this.asignar.idRol = this.roles![0][0];

    this.asignarCategoria.idPersona = this.persona![0][0];
    this.asignarCategoria.idCategoria = this.cat![0][0];

    this.rolService.asignarRol(this.asignar).subscribe
    (
      datos =>
      {
        if(datos['respuesta'] == 1 || datos['respuesta'] == 2)
        {
          this.deporteService.asignarCategoria(this.asignarCategoria).subscribe
          (
            data => 
            {
              console.log(data);
              if(data['respuesta'] == 1)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'SOLICITUD ENVIADA',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                }).then(resultado => {
                  location.reload();
                })
              }
              else if(data['respuesta'] == 2)
              {
                Swal.fire
                ({
                  title: '',
                  text: 'LA CATEGORÍA YA ESTA ASOCIADA',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  showConfirmButton: true
                })
              }
              else
              {
                Swal.fire
                ({
                  title: '',
                  text: 'ERROR AL ASIGNAR LA CATEGORÍA',
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
            text: 'ERROR AL ASIGNAR EL ROL',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true
          })
        }
      }
    );
  }
}
