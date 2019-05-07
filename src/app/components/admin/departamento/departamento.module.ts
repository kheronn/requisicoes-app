import { NgModule } from '@angular/core';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    DepartamentoRoutingModule
  ]
})
export class DepartamentoModule { }
