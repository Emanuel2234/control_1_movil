import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisDatosPage } from './misdatos.page';

const routes: Routes = [
  {
    path: '',
    component: MisDatosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisDatosPageRoutingModule {}
//close