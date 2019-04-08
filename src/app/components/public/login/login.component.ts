import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  msg: string;
  emailEnviado: boolean;
  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  signin() {
    try {
      if (this.email == undefined ||
        this.senha == undefined) {
        this.msg = 'Usuário ou senha vazios'
        return
      }
      this.authServ.login(this.email, this.senha)
        .then(() => {
          this.router.navigate(['/admin/painel'])
        })
        .catch(erro => {
          let detalhes = '';
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha Inválida';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
          this.msg = `Erro ao logar. ${detalhes}`;

        }
        );
    } catch (erro) {
      this.msg = `Erro ao logar. Detalhes: ${erro}`;
    }

  }



}
