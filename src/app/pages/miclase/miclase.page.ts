import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/interfaces/asistencia'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {
  public asistencia: Asistencia | undefined;

  constructor(private activatedRoute: ActivatedRoute,private router:Router) {}

  cerrarSesion() {
    // Aquí puedes agregar la lógica para cerrar sesión
    this.router.navigate(['/ingreso']); // Redirigir al login
  }

  navegar(pagina: string) {
    this.router.navigate([pagina]); // Navegar a la página especificada
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['data']) {
        this.asistencia = JSON.parse(params['data']);
      }
    });
  }



}





