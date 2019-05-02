import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { SharedModule } from 'src/app/modules/comuns.module';

@NgModule({
  declarations: [DepartamentoComponent],
  imports: [
    SharedModule,
    DepartamentoRoutingModule
  ]
})
export class DepartamentoModule { }
