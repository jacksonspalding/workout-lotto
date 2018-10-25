import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass']
})
export class ActivityComponent implements OnInit {

  activityCollection: AngularFirestoreCollection<Activity>;
  activities: Observable<Activity[]>;
  deleted: Activity[] = [];

  constructor(public auth: AngularFireAuth, private db: AngularFirestore) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.activityCollection = this.db.collection<Activity>('activities', ref => ref.where('uid', '==', user.uid).orderBy('date', 'desc'));
        this.activities = this.activityCollection.snapshotChanges().pipe(
          map(activities => {
            return activities.map(activity => {
              const data = activity.payload.doc.data() as Activity;
              const id = activity.payload.doc.id;
              return { id,...data };
            });
          })
        )
      }
    });
  }

  ngOnInit() {
  }

  deleteActivity(activity) {
    this.deleted.push(activity);
    this.activityCollection.doc<Activity>(activity.id).delete();
  }

  undoDelete() {
    this.deleted.forEach((activity: any) => {
      const id = activity.id;
      delete activity.id;
      this.db.collection<Activity>('activities').doc(id).set(activity);
    });
    this.deleted = [];
  }

  closeUndo() {
    this.deleted = [];
  }

}
