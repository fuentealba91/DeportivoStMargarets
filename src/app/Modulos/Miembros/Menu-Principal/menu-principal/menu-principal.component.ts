import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/Modulos/Principal/contacto.service';
import { PersonaService } from '../../persona.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  public contador = 0;

  constructor(private contactoService: ContactoService, private personaService: PersonaService, private router: Router)
  {}

  ngOnInit(): void {
    
    // si el usuario esta logeado se muestra, sino redirigir
    if (sessionStorage.getItem("id") == null)
    {
      const redirect = this.personaService.redirectUrl ? this.personaService.redirectUrl : '/login';
      this.router.navigate([redirect]);
    }

    this.listarContactoNuevo();
  }

  listarContactoNuevo()
  {
    this.contactoService.listarContactoNuevo().subscribe
    (
      (datos:any) => this.contador = datos
    );
  }
}
