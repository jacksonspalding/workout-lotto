import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = this.db.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {}

}
