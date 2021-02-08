import { Movimentacao, Requisicao } from './../../../../models/requisicao.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequisicaoService } from 'src/app/services/requisicao.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Funcionario } from 'src/app/models/funcionario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() movimentacoes: Movimentacao[];
  @Input() requisicaoSelecionada: Requisicao;
  @Input() displayDialogMovimentacoes: boolean;
  @Input() funcionarioLogado: Funcionario;
  @Output() displayChange = new EventEmitter();

  listaStatus: string[];
  displayDialogMovimentacao: boolean;
  form: FormGroup;
  edit: boolean;
  indexMovimentacoes: number;

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();
    this.carregaStatus();
  }


  configForm() {
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  carregaStatus() {
    this.listaStatus = ['Aberto', 'Pendente', 'Processando', 'Não autorizada', 'Finalizado'];
  }

  selecionaMovimento(mov: Movimentacao, index: number) {
    this.edit = true;
    this.displayDialogMovimentacao = true;
    this.form.setValue(mov);
    this.indexMovimentacoes = index
  }

  onClose() {
    this.displayChange.emit(false);
  }

  update() {
    this.movimentacoes[this.indexMovimentacoes] = this.form.value
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate(this.requisicaoSelecionada)
      .then(() => {
        this.displayDialogMovimentacao = false;
        Swal.fire(`Movimentação ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success');
      })
      .catch((erro) => {
        this.displayDialogMovimentacao = true;
        Swal.fire(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o Movimentação.`, `Detalhes: ${erro}`, 'error');
      })
    this.form.reset()
  }

  remove(array, element) {
    return array.filter(el => el !== element);
  }

  delete(mov: Movimentacao) {
    const movs = this.remove(this.movimentacoes, mov)
    Swal.fire({
      title: 'Confirma a exclusão da Movimentação?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.requisicaoSelecionada.movimentacoes = movs;
        this.requisicaoService.createOrUpdate(this.requisicaoSelecionada)
          .then(() => {
            Swal.fire('Movimentação excluída com sucesso!', '', 'success')
            this.movimentacoes = movs;
          })
      }
    })
  }
}
