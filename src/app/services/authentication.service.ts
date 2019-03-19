import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
 providedIn: 'root'
})
export class AuthenticationService {

 private user: Observable<firebase.User>;

 constructor(private afAuth: AngularFireAuth) {
     this.user = afAuth.authState;
 }

 resetPassword(email: string) {
     let auth = firebase.auth();
     return auth.sendPasswordResetEmail(email)

 }

 authUser(): Observable<firebase.User> {
     return this.user;
 }

 login(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password);
 }

 logout() {
     return this.afAuth.auth.signOut();
 }

}
