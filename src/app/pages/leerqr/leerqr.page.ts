import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {
  
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  public usuario: Usuario;
  public asistencia: Asistencia | undefined = undefined;
  public escaneando = false;
  public datosQR: string = '';
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private animationController: AnimationController) { 
    
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    
    const usuarioPersistente = localStorage.getItem('usuario');
    if (usuarioPersistente) {
      this.usuario = Object.assign(new Usuario(), JSON.parse(usuarioPersistente));
    }    
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    
  }

  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(1000)
      .fromTo('transform', 'rotateY(deg)', 'rotateY(-180)')
      .duration(1000)
      .fromTo('transform', 'rotateY(-180deg)', 'rotateY(0deg)')
      .play();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(0%)', 'translate(100%)')
      .fromTo('opacity', 0.2, 1)
      .play();
  }

  ngOnInit() {
    this.comenzarEscaneoQR();
    
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA){
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true });
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    this.asistencia = JSON.parse(datosQR);
    
    // Navegar a 'miclase' pasando los datos como parámetro en la URL
    this.router.navigate(['miclase'], { queryParams: { data: JSON.stringify(this.asistencia) } });
  }



  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  cerrarSesion() {
    // Aquí puedes agregar la lógica para cerrar sesión
    this.router.navigate(['/ingreso']); // Redirigir al login
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
