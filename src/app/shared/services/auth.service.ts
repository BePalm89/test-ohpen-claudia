import { Injectable } from '@angular/core';
import { User } from '../models/User.model';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    {
      username: 'User 1',
      role: Role.admin 
    },
    {
      username: 'User 2',
      role: Role.hr
    }
]

  constructor() { }

  checkAuth(user: User): boolean {
    return this.users.some((el: User) => el.username === user.username && el.role === user.role);
  }

  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getLoggedUser(): User {
   return  JSON.parse(localStorage.getItem('currentUser'));
  }

}
