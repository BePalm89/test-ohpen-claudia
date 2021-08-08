import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authService.getLoggedUser();
    if (currentUser) {
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  
}
