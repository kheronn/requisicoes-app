import { Departamento } from './../../../models/departamento.model';
import { DepartamentoService } from './../../../services/departamento.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos$: Observable<Departamento[]>;
  departamentoSelecionado: Departamento;
  edit: boolean;
  displayDialogDepartamento: boolean;

  constructor(private deptoService: DepartamentoService) { }

  ngOnInit() {
    this.departamentos$ = this.deptoService.list()
  }

  add() {
    this.edit = false;
    this.displayDialogDepartamento = true;
    this.departamentoSelecionado = new Departamento();
  }

  selecionaDepartamento(depto:Departamento) {
    this.edit = true;
    this.displayDialogDepartamento = true;
    this.departamentoSelecionado = depto;
  }



}
