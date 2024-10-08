import { Component } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage {

  public usuario: Usuario;

  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
    const usuarioPersistente = localStorage.getItem('usuario');
    if (usuarioPersistente) {
      this.usuario = Object.assign(new Usuario(), JSON.parse(usuarioPersistente));
    } 
  }

  
  ingresar() {
    // Recuperar los datos del usuario del localStorage
    const usuarioPersistente = localStorage.getItem('usuario');
    if (usuarioPersistente) {
      const datosUsuario = JSON.parse(usuarioPersistente);

      // Comprobar las credenciales ingresadas
      if (this.usuario.cuenta === datosUsuario.cuenta && this.usuario.password === datosUsuario.password) {
        // Credenciales correctas, proceder al inicio de sesión
        this.router.navigate(['/leerqr']); // O la ruta que quieras
        this.presentToast('Inicio de sesión exitoso.'); // Mensaje de éxito
      } else {
        this.presentToast('Credenciales incorrectas.'); // Mensaje de error
      }
    } else {
      this.presentToast('No se encontró el usuario en el localStorage.'); // Mensaje de error
    }
  }


  

  public ingresarPaginaValidarCorreo(): void{
    this.router.navigate(['/correo']);
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }


  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    await toast.present();
  }

  async presentToast(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion? duracion: 2000
    });
  await toast.present();
}

  actualizarUsuario() {
    // Primero, actualizamos los datos del usuario en la clase.
    this.usuario.actualizarUsuario();
  
    // Luego, almacenamos el usuario actualizado en localStorage.
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  
    // Opcional: Si quieres redirigir al usuario a otra página después de actualizar
    // this.router.navigate(['/ruta']);  // Descomenta y ajusta si es necesario
  }

}
//close