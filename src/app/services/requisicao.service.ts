import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/servicefirebase.service';
import { Requisicao } from '../models/requisicao.model';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService extends ServiceFirebase<Requisicao> {

  constructor(firestore: AngularFirestore) {
    super(Requisicao, firestore, 'requisicoes');
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
