import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { Activity } from '../Activity';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.sass']
})
export class ActivityCreateComponent implements OnInit {

  activityForm: FormGroup;
  activityCollection: AngularFirestoreCollection<Activity>;

  constructor(public auth: AngularFireAuth, private db: AngularFirestore, private router: Router, private fb: FormBuilder) {
    this.activityCollection = this.db.collection<Activity>('activities');
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.activityForm = this.fb.group({
      date: ['', Validators.required],
      duration: ['', Validators.required],
      description: ''
    });
  }

  add(value) {
    this.auth.authState.subscribe(user => {
      if (user) {
        // Using slashes instead of hyphens gives the correct date.
        let date = new Date(value.date.replace(/-/g, '\/'));
        const activity: Activity = {
          date: date,
          duration: value.duration,
          description: value.description,
          uid: user.uid
        };
        this.activityCollection.add(activity).then(doc => {
          this.router.navigate(['/activities']);
        });
      }
    });
  }

}
