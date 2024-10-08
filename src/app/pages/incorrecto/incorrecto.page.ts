import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
  public usuario: Usuario | undefined;
  constructor(private router:Router) { }

  irALogin() {
    this.router.navigate(['/ingreso']);
  }

  ngOnInit() {
  }

  navegar(pagina: string) {
    // Navegar directamente a la página indicada
    this.router.navigate([pagina]);
  }

}
