import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { User } from '../User';

// https://github.com/angular/angularfire2/issues/282

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  register(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          const user: User = { username: value.name };
          this.db.collection<User>('users').doc(res.user.uid).set(user);
          resolve(res);
        }, err => reject(err))
    })
  }

  login(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
