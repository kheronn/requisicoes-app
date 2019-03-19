import { Departamento } from './departamento.model';
import { Funcionario } from './funcionario.model';
import { Model } from '../core/model';



export class Requisicao extends Model {
  solicitante: Funcionario;
  dataAbertura: Date;
  ultimaAtualizacao: Date;
  status: string;
  destino: Departamento;
  movimentacoes: Movimentacao[];
}


export class Movimentacao extends Model {
  funcionario: Funcionario;
  dataHora: Date;
  status: string
  descricao: string;
}
