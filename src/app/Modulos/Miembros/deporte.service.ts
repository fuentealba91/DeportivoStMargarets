import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarDeportes()
  {
    return this.http.get(`${this.url}listarDeporte.php`);
  }

  agregarDeporte(deporte: any)
  {
    return this.http.post(`${this.url}agregarDeporte.php`, JSON.stringify(deporte));
  }
}
