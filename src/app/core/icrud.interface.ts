import { Observable } from 'rxjs';
import { Model } from './model';

export interface ICrud<T extends Model> {

  get(id: string): Observable<T>;
  list(): Observable<T[]>;
  createOrUpdate(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}
