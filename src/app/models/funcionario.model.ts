import { Departamento } from './departamento.model';
import { Model } from '../core/model';

export class Funcionario extends Model {
  nome: string;
  funcao: string;
  email: string;
  foto: string;
  ultimoAcesso: any;
  departamento: Departamento;
}
