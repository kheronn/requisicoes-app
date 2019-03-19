import { ICrud } from './icrud.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Model } from './model';

export abstract class IServiceFirebase<T extends Model> implements ICrud<T> {


  ref: AngularFirestoreCollection<T>

  constructor(protected type: { new(): T; }, protected firestore: AngularFirestore, public path: string) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map(snapshot => this.docToClass(snapshot)));
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges()
  }

  createOrUpdate(item: T): Promise<any> {
    let id = item.id;
    if (!item)
      return
    let obj = null;

    if (item instanceof this.type)
      obj = item.toObject();
    else
      obj = item;
    if (id) {
      return this.ref.doc(id).set(obj);
    }
    else
      return this.ref.add(obj).then(res => {
        obj.id = res.id; // Para salvar com o atributo id
        this.ref.doc(res.id).set(obj);
      })
  }

  delete(id: string): void {
    this.ref.doc(id).delete();
  }

  docToClass(snapshotDoc): T {
    let obj = {
      id: snapshotDoc.id,
      ...(snapshotDoc.data() as T)
    }
    let typed = plainToClass(this.type, obj)
    return typed;
  }


}
