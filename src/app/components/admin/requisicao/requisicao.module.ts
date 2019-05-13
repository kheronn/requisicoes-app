import { MovimentacaoRoutingModule } from './../movimentacao/movimentacao-routing.module';
import { MovimentacaoComponent } from './../movimentacao/movimentacao.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgModule } from '@angular/core';
import { RequisicaoRoutingModule } from './requisicao-routing.module';
import { RequisicaoComponent } from './requisicao.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RequisicaoComponent, MovimentacaoComponent],
  imports: [
    ComumModule,
     RequisicaoRoutingModule,
     NgSelectModule
  ]
})
export class RequisicaoModule { }
