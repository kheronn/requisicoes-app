import { NgModule } from '@angular/core';
import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [MovimentacaoComponent],
  imports: [
    ComumModule,
    MovimentacaoRoutingModule,
     NgSelectModule
  ]
})
export class MovimentacaoModule { }
