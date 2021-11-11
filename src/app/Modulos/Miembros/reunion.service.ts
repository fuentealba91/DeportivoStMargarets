import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  agendarReunion(reunion: any)
  {
    return this.http.post(`${this.url}agendarReunion.php`, JSON.stringify(reunion));
  }

  listarReunion()
  {
    return this.http.get(`${this.url}listarReunion.php`);
  }

  detalleReunion(iden: number)
  {
    return this.http.get(`${this.url}detalleReunion.php?id=${iden}`);
  }

  eliminarReunion(iden: number)
  {
    return this.http.get(`${this.url}eliminarReunion.php?id=${iden}`);
  }

  agregarAcuerdos(resultado)
  {
    return this.http.post(`${this.url}agregarAcuerdos.php`, JSON.stringify(resultado));
  }

  invitarReunion(invitacion)
  {
    console.log(invitacion);
    return this.http.post(`${this.url}invitarReunion.php`, JSON.stringify(invitacion));
  }
}