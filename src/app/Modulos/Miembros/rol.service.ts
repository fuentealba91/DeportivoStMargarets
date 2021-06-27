import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  AgregarRol(rol: any)
  {  
    return this.http.post(`${this.url}agregarRol.php`, JSON.stringify(rol));
  }

  listarRoles()
  {
    return this.http.get(`${this.url}listarRol.php`);
  }

  detalleRol(iden: number)
  {
    return this.http.get(`${this.url}detalleRol.php?id=${iden}`);
  }

  eliminarRol(iden: number)
  {
    return this.http.get(`${this.url}eliminarRol.php?id=${iden}`);
  }

  modificarRol(modificado)
  {
    return this.http.post(`${this.url}modificarRol.php`, JSON.stringify(modificado));
  }

  asignarRol(asignar)
  {
    return this.http.post(`${this.url}asignarRol.php`, JSON.stringify(asignar));
  }

  listarRolAsignado()
  {
    return this.http.get(`${this.url}listarRolAsignado.php`);
  }
}
