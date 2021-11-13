import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticias } from '../../Modelos/noticias';
import { NoticiasService } from '../noticias.service';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticia = new Noticias();
  noticias = null;
  det = null;

  constructor(private noticiasService: NoticiasService, private router: Router) { }

  ngOnInit(): void {

    
    this.listarNoticias();
  }

  listarNoticias()
  {
    this.noticiasService.listarNoticias().subscribe
    (
      (datos:any) => {this.noticias = datos, console.log(datos)}
    );
  }

  detalleNoticiaId(iden)
  {
    this.noticiasService.detalleNoticia(iden).subscribe
    (
      (datos:any) => this.det = datos
    );
  }
}
