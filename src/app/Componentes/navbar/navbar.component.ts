import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/Modulos/Miembros/persona.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginbtn!:boolean;
  logoutbtn!: boolean;
  
  constructor(private viewportScroller: ViewportScroller, private persona: PersonaService)
  {
    persona.getLoggedInName.subscribe((name: boolean) => this.changeName(name));
    if(this.persona.isLoggedIn())
    {
      console.log("loggedin");
      this.loginbtn=false;
      this.logoutbtn=true;
    }
    else
    {
      this.loginbtn=true;
      this.logoutbtn=false;
    }
  }

  onClickScroll(elementId: string) :void{
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void 
  {
    var nav = document.querySelector('nav');
    nav?.classList.add('bg-white', 'shadow');
  }

  private changeName(name: boolean): void 
  {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  
  logout()
  {
    this.persona.deleteToken();
    window.location.href = "/inicio";
  }

}
