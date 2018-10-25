import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Activity } from '../Activity';

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.sass']
})
export class ActivityUpdateComponent implements OnInit {

  activityForm: FormGroup;
  activityCollection: AngularFirestoreCollection<Activity>;

  constructor(public auth: AngularFireAuth, private db: AngularFirestore, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.activityCollection = this.db.collection<Activity>('activities');
    this.createForm();
    this.route.data.subscribe(data => {
      let formatDate = new DatePipe('en-US').transform(data.activity.date.toDate(), 'yyyy-MM-dd');
      this.activityForm.setValue({
        date: formatDate,
        duration: data.activity.duration,
        description: data.activity.description
      })
    });
  }

  createForm() {
    this.activityForm = this.fb.group({
      date: ['', Validators.required],
      duration: ['', Validators.required],
      description: ''
    });
  }

  update(value) {
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
        this.activityCollection.doc(this.route.snapshot.params['id']).update(activity).then(doc => {
          this.router.navigate(['/activities']);
        });
      }
    });
  }

}
