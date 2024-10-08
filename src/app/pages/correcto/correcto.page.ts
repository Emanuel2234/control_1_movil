import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario | undefined;
  public password: string | undefined; // Para almacenar el password

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    // Suscribirse a los parámetros de navegación
    this.activatedRoute.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        // Asignar el password proveniente del estado de NavigationExtras
        this.password = navigation.extras.state['password'];
      }
    });
  }

  ngOnInit() {
    // Verificación adicional si no se recibió correctamente el password
    if (!this.password) {
      console.log('No se recibió el password.');
    }
  }

  navegar(pagina: string) {
    // Navegar directamente a la página indicada
    this.router.navigate([pagina]);
  }
}
