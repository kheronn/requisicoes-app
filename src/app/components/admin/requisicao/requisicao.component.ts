import { Funcionario } from 'src/app/models/funcionario.model';
import { FuncionarioService } from './../../../services/funcionario.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Departamento } from 'src/app/models/departamento.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Requisicao[]>;
  departamentos$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  funcionarioLogado: Funcionario;

  constructor(private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private auth: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
    this.recuperaFuncionario()
  }

  async recuperaFuncionario() {
    await this.auth.authUser()
      .subscribe(dados => {
        this.funcionarioService.getFuncionarioLogado(dados.email)
          .subscribe(funcionarios => {
            this.funcionarioLogado = funcionarios[0];
            this.requisicoes$ = this.requisicaoService.list()
              .pipe(
                map((reqs: Requisicao[]) => reqs.filter(r => r.solicitante.email === this.funcionarioLogado.email))
              )
          })

      })
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      movimentacoes: new FormControl('')
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogRequisicao = true;
    this.setValorPadrao();
  }

  setValorPadrao() {
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'Aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
      movimentacoes: []
    })
  }

  selecionaRequisicao(func: Requisicao) {
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(func);
  }

  save() {
    this.requisicaoService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogRequisicao = false;
        Swal.fire(`Requisição ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success')
        this.displayDialogRequisicao = false;
      })
      .catch((erro) => {
        this.displayDialogRequisicao = true;
        Swal.fire(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Requisição.`, `Detalhes: ${erro}`, 'error')
      })
    this.form.reset()
  }

  delete(depto: Requisicao) {
    Swal.fire({
      title: 'Confirma a exclusão do Requisição?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.requisicaoService.delete(depto.id)
          .then(() => {
            Swal.fire('Requisição excluído com sucesso!', '', 'success')
          })
      }
    })
  }


}
