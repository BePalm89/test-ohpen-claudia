import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { Role } from '../../models/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedUser: User;
  roles: Role;

  constructor(private autService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.autService.getLoggedUser();
  }

  logout() {
    this.router.navigate(["/login"]);
    this.autService.logout();
  }

  isAdmin(): boolean {
    return this.autService.getLoggedUser().role === Role.admin;
  }

}
