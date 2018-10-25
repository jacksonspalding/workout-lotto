import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {
    return this.auth.afAuth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/login'])
      })
    )
  }
}
