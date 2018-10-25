import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  currentUrl: String;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

  closeMenu() {
    document.body.classList.remove('menu-open');
  }

}
