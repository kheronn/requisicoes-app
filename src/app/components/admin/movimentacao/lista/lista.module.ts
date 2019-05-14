import { NgModule } from '@angular/core';
import { ListaRoutingModule } from './lista-routing.module';
import { ListaComponent } from './lista.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ListaComponent],
  imports: [
    ComumModule,
    NgSelectModule,
    ListaRoutingModule
  ]
})
export class ListaModule { }
