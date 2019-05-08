import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterDepartamentoPipe implements PipeTransform {

  transform(value: any, filtro: any): any {
    if (filtro == 'TODOS') return value;
    if (value) {
      if (!value) return [];
      if (!value || value.length === 0) return value;
      return value.filter(it => (it.departamento.nome === filtro))
    }
  }
}
