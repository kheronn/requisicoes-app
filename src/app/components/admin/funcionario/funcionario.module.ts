import { FilterDepartamentoPipe } from './../../../pipes/filter.pipe';
import { ComumModule } from './../../../modules/comum.module';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';

@NgModule({
  declarations: [FuncionarioComponent, FilterDepartamentoPipe],
  imports: [
    ComumModule,
    NgSelectModule,
    FuncionarioRoutingModule
  ]
})
export class FuncionarioModule { }
