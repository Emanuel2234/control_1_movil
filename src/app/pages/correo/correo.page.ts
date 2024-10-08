import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo : string = '';

  constructor(private router :Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    // Crear un usuario temporal vacío para realizar la búsqueda
    const usuario = new Usuario();
  
    // Buscar el usuario por correo
    const usuarioEncontrado = Usuario.getListaUsuarios().find(
      usu => usu.correo === this.correo
    );
  
    // Si no se encuentra el usuario, mostrar una alerta
    if (!usuarioEncontrado) {
      this.mostrarAlerta('EL CORREO NO EXISTE DENTRO DE LAS CUENTAS VALIDAS DEL SISTEMA');
    } 
    else {
      // Si el usuario es encontrado, preparar los parámetros para la navegación
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
  
      // Navegar a la página de pregunta secreta con los datos del usuario
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }
  
  navegar(pagina: string) {
    // Navegar directamente a la página indicada
    this.router.navigate([pagina]);
  }

}
//close