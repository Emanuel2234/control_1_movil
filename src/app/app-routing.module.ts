import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full'
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./pages/ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'misdatos',
    loadChildren: () => import('./pages/misdatos/misdatos.module').then( m => m.MisDatosPageModule)
  },
  {
    path: 'leerqr',
    loadChildren: () => import('./pages/leerqr/leerqr.module').then( m => m.LeerqrPageModule)
  },
  {
    path: 'correo',
    loadChildren: () => import('./pages/correo/correo.module').then( m => m.CorreoPageModule)
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./pages/pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },
  {
    path: 'miclase',
    loadChildren: () => import('./pages/miclase/miclase.module').then( m => m.MiclasePageModule)
  },
  {
    path: 'correcto',
    loadChildren: () => import('./pages/correcto/correcto.module').then( m => m.CorrectoPageModule)
  },
  {
    path: 'incorrecto',
    loadChildren: () => import('./pages/incorrecto/incorrecto.module').then( m => m.IncorrectoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
