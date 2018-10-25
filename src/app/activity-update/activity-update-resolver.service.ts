import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, catchError } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Activity } from '../Activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityUpdateResolverService implements Resolve<any> {

  constructor(public auth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {
    let id = route.paramMap.get('id');

    return this.db.collection<Activity>('activities').doc(id).valueChanges().pipe(
      take(1),
      mergeMap(activity => {
        if (activity) {
          return of(activity);
        } else {
          this.router.navigate(['/activities']);
          return EMPTY;
        }
      }),
      catchError(e => {
        this.router.navigate(['/activities']);
        return EMPTY;
      })
    );
  }
}
