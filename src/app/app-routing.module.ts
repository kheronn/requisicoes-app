import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/painel',  loadChildren: './components/admin/painel/painel.module#PainelModule'  },
  { path: 'admin/funcionario',  loadChildren: './components/admin/funcionario/funcionario.module#FuncionarioModule'  },
  { path: 'admin/departamento',  loadChildren: './components/admin/departamento/departamento.module#DepartamentoModule'  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
