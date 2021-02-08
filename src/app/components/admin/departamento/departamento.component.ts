import { Departamento } from './../../../models/departamento.model';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogDepartamento: boolean;
  form: FormGroup;

  constructor(private departamentoService: DepartamentoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.departamentos$ = this.departamentoService.list()
    this.configForm()
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('')
    })
  }

  add() {
    this.form.reset();
    this.edit = false;
    this.displayDialogDepartamento = true;
  }

  selecionaDepartamento(depto: Departamento) {
    this.edit = true;
    this.displayDialogDepartamento = true;
    this.form.setValue(depto);
  }

  save() {
    this.departamentoService.createOrUpdate(this.form.value)
      .then(() => {
        this.displayDialogDepartamento = false;
        Swal.fire(`Departamento ${!this.edit ? 'salvo' : 'atualizado'} com sucesso.`, '', 'success')
      })
      .catch((erro) => {
        this.displayDialogDepartamento = false;
        Swal.fire(`Erro ao ${!this.edit ? 'salvo' : 'atualizado'} o departamento.`, `Detalhes: ${erro}`, 'error')
      })
    this.form.reset()
  }

  delete(depto: Departamento) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.departamentoService.delete(depto.id)
          .then(() => {
            Swal.fire('Departamento excluído com sucesso!', '', 'success')
          })
      }
    })
  }


}
