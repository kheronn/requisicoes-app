import { AuthguardService } from './services/authguard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin/painel', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/painel', loadChildren: () => import('./components/admin/painel/painel.module').then(m => m.PainelModule), canActivate: [AuthguardService]},
  { path: 'admin/funcionario', loadChildren: () => import('./components/admin/funcionario/funcionario.module').then(m => m.FuncionarioModule), canActivate: [AuthguardService]},
  { path: 'admin/departamento', loadChildren: () => import('./components/admin/departamento/departamento.module').then(m => m.DepartamentoModule), canActivate: [AuthguardService]},
  { path: 'admin/requisicao', loadChildren: () => import('./components/admin/requisicao/requisicao.module').then(m => m.RequisicaoModule), canActivate: [AuthguardService]},
  { path: 'admin/movimentacao', loadChildren: () => import('./components/admin/movimentacao/movimentacao.module').then(m => m.MovimentacaoModule), canActivate: [AuthguardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
