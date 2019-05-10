import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterDepartamentoPipe implements PipeTransform {

  transform(value: any, filtro: any): any {
    if (filtro == 'TODOS') return value;
    if (value) {
       return value.filter(elem => (elem.departamento.nome === filtro))
    }
  }
}
