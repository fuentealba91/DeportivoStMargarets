import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarNoticias()
  {
    return this.http.get(`${this.url}listarNoticias.php`);
  }

  detalleNoticia(iden: number)
  {
    return this.http.get(`${this.url}detalleNoticia.php?id=${iden}`);
  }
}