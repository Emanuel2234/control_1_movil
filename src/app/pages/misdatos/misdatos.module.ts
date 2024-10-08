import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MisDatosPageRoutingModule } from './misdatos-routing.module';
import { MisDatosPage } from './misdatos.page';
import { RouteReuseStrategy } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

// CGV: Para usar Angular Material se deben agregar los sguientes módulos

@NgModule({
  imports: [
      CommonModule
    , FormsModule
    , IonicModule
    , MisDatosPageRoutingModule
    , MatDatepickerModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  declarations: [MisDatosPage],
})
export class MisDatosPageModule {}
//close