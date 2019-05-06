import { NgModule } from '@angular/core';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { SharedModule } from 'src/app/modules/comuns.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    DepartamentoRoutingModule
  ]
})
export class DepartamentoModule { }
