import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  onClickScroll(elementId: string) :void{
    this.viewportScroller.scrollToAnchor(elementId);
  }
  ngOnInit(): void 
  {
    var nav = document.querySelector('nav');
    nav?.classList.add('bg-white', 'shadow');

    // window.addEventListener('scroll', function()
    // {
    //   if(window.pageYOffset > 100)
    //   {
    // nav?.classList.add('bg-white', 'shadow');
    //   }
    //   else
    //   {
    //     nav?.classList.remove('bg-white', 'shadow');
    //   }
    // });
  }

}
