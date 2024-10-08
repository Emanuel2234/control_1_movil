import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined; // Para evitar errores si no se recibe un usuario
  public respuesta: string = ''; // Para almacenar la respuesta ingresada por el usuario

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    // Suscribirse a los parámetros de navegación
    this.activatedRoute.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        // Asignar el usuario proveniente del estado de NavigationExtras
        this.usuario = navigation.extras.state['usuario'];
      } else {
        // Si no se recibió el usuario, redirigir al login
        this.router.navigate(['/ingreso']);
      }
    });
  }

  // Método para validar la respuesta secreta
  public async validarRespuestaSecreta(): Promise<void> {
    if (this.usuario?.respuestaSecreta === this.respuesta) {
      // Redirigir a la página "correcto" pasando los datos del usuario, incluyendo el password
      const navigationExtras = {
        state: {
          usuario: this.usuario, // Pasar el usuario completo, incluyendo el password
          password: this.usuario?.password // Pasar solo el password
        }
      };
      this.router.navigate(['/correcto'], navigationExtras);
    } else {
      // Redirigir a incorrecto.html
      this.router.navigate(['/incorrecto']); // 
    }
  }

  ngOnInit() {
    // Verificación adicional en caso de que el usuario no haya sido recibido correctamente
    if (!this.usuario) {
      this.router.navigate(['/ingreso']);
    }
  }

  navegar(pagina: string) {
    // Navegar directamente a la página indicada
    this.router.navigate([pagina]);
  }
}


//close