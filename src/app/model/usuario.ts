import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public repetirPassword: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;
  public asistencia: Asistencia;
  public listaUsuarios: Usuario[];

  constructor() {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.repetirPassword = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
    this.asistencia = this.asistenciaVacia();
    this.listaUsuarios = [];
  }

  public asistenciaVacia(): Asistencia {
    return {  
      bloqueInicio: 0,
      bloqueTermino: 0,
      dia: '',
      horaFin: '',
      horaInicio: '',
      idAsignatura: '',
      nombreAsignatura: '',
      nombreProfesor: '',
      seccion: '',
      sede: ''
    };
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    return usuario;
  }

  public static buscarUsuarioValido(cuenta: string, password: string): Usuario | undefined {
    return Usuario.getListaUsuarios().find(
      usu => usu.cuenta === cuenta && usu.password === password);
  }

  public buscarUsuarioPorCuenta(cuenta: string): Usuario | undefined {
    return this.listaUsuarios.find(usu => usu.cuenta === cuenta);
  }

  public static buscarUsuarioPorCorreo(correo: string) : Usuario | undefined {//buqueda de correo temporal (borrar)
    return Usuario.getListaUsuarios().find(
      usu => usu.cuenta === correo );
  }


  public validarCuenta(): string {
    if (this.cuenta.trim() === '') {
      return 'Para ingresar al sistema debe seleccionar una cuenta.';
    }
    return '';
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para igresar al sistema debe escribir la contraseña.';
    }
    for (let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarUsuario(): string {
    let error = this.validarCuenta();
    if (error) return error;
    error = this.validarPassword();
    if (error) return error;
    const usu = Usuario.buscarUsuarioValido(this.cuenta, this.password);
    if (!usu) return 'Las credenciales del usuario son incorrectas.';
    return '';
  }

  public override toString(): string {
    return `      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}`;
  }

  public static getListaUsuarios(): Usuario[] {
    return [
      Usuario.getNewUsuario(
        'atorres', 
        'atorres@duocuc.cl', 
        '1234', 
        '¿Cuál es tu animal favorito?', 
        'gato', 
        'Ana', 
        'Torres', 
        NivelEducacional.buscarNivelEducacional(6)!,
        new Date(2000, 0, 1)
      ),
      Usuario.getNewUsuario(
        'jperez',
        'jperez@duocuc.cl',
        '5678',
        '¿Cuál es tu postre favorito?',
        'panqueques',
        'Juan',
        'Pérez',
        NivelEducacional.buscarNivelEducacional(5)!,
        new Date(2000, 1, 1)
      ),
      Usuario.getNewUsuario(
        'cmujica',
        'cmujica@duocuc.cl',
        '0987',
        '¿Cuál es tu vehículo favorito?',
        'moto',
        'Carla',
        'Mujica',
        NivelEducacional.buscarNivelEducacional(6)!,
        new Date(2000, 2, 1)
      ),
    ]
  }

  recibirUsuario(activatedRoute: ActivatedRoute, router: Router) {
    activatedRoute.queryParams.subscribe(() => {
      const nav = router.getCurrentNavigation();
      if (nav && nav.extras.state) {
        const cuenta = nav.extras.state['cuenta'];
        const password = nav.extras.state['password'];
        const usu = Usuario.buscarUsuarioValido(cuenta, password);
  
        if (usu) {
          this.cuenta = usu.cuenta;
          this.correo = usu.correo;
          this.password = usu.password;
          this.preguntaSecreta = usu.preguntaSecreta;
          this.respuestaSecreta = usu.respuestaSecreta;
          this.nombre = usu.nombre;
          this.apellido = usu.apellido;
          this.nivelEducacional = usu.nivelEducacional;
          this.fechaNacimiento = usu.fechaNacimiento;
  
          // Cargar datos persistentes
          const usuarioPersistente = localStorage.getItem('usuario');
          if (usuarioPersistente) {
            const datosUsuario = JSON.parse(usuarioPersistente);
            this.cuenta = datosUsuario.cuenta;
            this.correo = datosUsuario.correo;
            this.password = datosUsuario.password;
            // Cargar los demás datos...
          }
  
          return;
        }
      }
      router.navigate(['/login']);
    });
  }

  navegarEnviandousuario(router: Router, pagina: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        cuenta: this.cuenta,
        password: this.password,
      }
    }
    if (this.cuenta.trim() !== ''&& this.password.trim()!== ''){
      router.navigate([pagina], navigationExtras);
    }else{
      router.navigate(['/ingreso'])
    }
  }
  actualizarUsuario() {
    // Validar que las contraseñas coincidan
    if (this.password !== this.repetirPassword) {
      console.log('Error: Las contraseñas no coinciden.');
      return;
    }


    const usu = this.buscarUsuarioPorCuenta(this.cuenta);
    if (usu) {
      usu.correo = this.correo;
      usu.password = this.password;
      usu.preguntaSecreta = this.preguntaSecreta;
      usu.respuestaSecreta = this.respuestaSecreta;
      usu.nombre = this.nombre;
      usu.apellido = this.apellido;
      usu.nivelEducacional = this.nivelEducacional;
      usu.fechaNacimiento = this.fechaNacimiento;
      usu.asistencia = this.asistencia;
  
      // Guardar el usuario actualizado en localStorage
      localStorage.setItem('usuario', JSON.stringify(usu));
      console.log('Información de usuario actualizada correctamente.');
    }
  }
  
}



