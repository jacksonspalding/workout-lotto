import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './users/users.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityUpdateComponent } from './activity-update/activity-update.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ActivityUpdateResolverService} from "./activity-update/activity-update-resolver.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: 'user',
  //   component: UserComponent,
  //   resolve: { data: UserResolver }
  // },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activities',
    component: ActivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activities/create',
    component: ActivityCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activities/update/:id',
    component: ActivityUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      activity: ActivityUpdateResolverService
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
