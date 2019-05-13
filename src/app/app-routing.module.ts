import { AuthguardService } from './services/authguard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/painel', loadChildren: './components/admin/painel/painel.module#PainelModule', canActivate: [AuthguardService]},
  { path: 'admin/funcionario', loadChildren: './components/admin/funcionario/funcionario.module#FuncionarioModule', canActivate: [AuthguardService]},
  { path: 'admin/departamento', loadChildren: './components/admin/departamento/departamento.module#DepartamentoModule', canActivate: [AuthguardService]},
  { path: 'admin/requisicao', loadChildren: './components/admin/requisicao/requisicao.module#RequisicaoModule', canActivate: [AuthguardService]},
  { path: 'admin/movimentacao', loadChildren: './components/admin/movimentacao/movimentacao.module#MovimentacaoModule', canActivate: [AuthguardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
