import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  login(value) {
    this.authService.login(value)
      .then(res => {
        this.router.navigate(['/activities']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}
