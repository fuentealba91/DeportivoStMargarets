import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PersonaCategoria } from '../../Modelos/persona-categoria';
import { CategoriaService } from '../categoria.service';
import { DeporteService } from '../deporte.service';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-gestor-deportistas',
  templateUrl: './gestor-deportistas.component.html',
  styleUrls: ['./gestor-deportistas.component.css']
})
export class GestorDeportistasComponent implements OnInit {

  filtro =
  {
    nombre: "",
    deporte: "",
    categoria: "",
    estado: "",
  };

  persona = null;
  deportes: any[] = [];
  categorias = null;
  deportistas: any[] = [];
  deportista = new PersonaCategoria();

  constructor(private categoriaService: CategoriaService, private deporteService: DeporteService, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.listarPerfil();
    this.listarDeportes();
    this.listarDeportistas();
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

  listarDeportes()
  {
    this.deporteService.listarDeportes().subscribe
    (
      (datos:any) => this.deportes = datos
    );
  }

  // filtrarDeportes(id)
  // {
  //   console.log(id);
  //   // for(let i=0; i<this.deportistas.length;i++)
  //   // {
  //   //   if(this.deportistas[i].idDeporte == id)
  //   //   {
  //   //     this.deportistas.push(this.deportistas[i]);
  //   //   }
  //   // }
  // }

  listarCategorias(id)
  {
    if(id != '')
    {
      this.categoriaService.listarCategoriaPorDeporte(id).subscribe
        (
          (datos: any) => { this.categorias = datos}
      );
    }
    else
    {
      this.categorias = null;
    }
  }

  listarDeportistas()
  {
    this.deporteService.listarDeportistas().subscribe
    (
      (datos: any) => {
        for(let i=0;i<datos.length;i++)
        {
          if(datos[i].estado != 0)
          {
            this.deportistas.push(datos[i]);
          }
        }
      }
    );
  }

  activarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 1;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA ACTIVADO',
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
            text: 'DEPORTISTA NO ACTIVADO',
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

  desactivarDeportista(deportista)
  {
    this.deportista.id = deportista.id;
    this.deportista.idPersona = deportista.idPersona;
    this.deportista.idCategoria = deportista.idCategoria;
    this.deportista.estado = 2;

    this.deporteService.modificarDeportista(this.deportista).subscribe
    (
      datos =>
      {
        if (datos['resultado'] == 1)
        {
          Swal.fire
          ({
            title: '',
            text: 'DEPORTISTA DESACTIVADO',
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
            text: 'DEPORTISTA NO DESACTIVADO',
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
