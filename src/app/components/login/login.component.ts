import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/shared/models/role.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userGroups = [Role.admin, Role.hr];
  loginForm = this.fb.group({
    username: [null, Validators.required],
    role: [null, Validators.required]
  });
  hasError = false;
  error = "";

  constructor(
    public fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authService.checkAuth(this.loginForm.value)) {
      this.authService.login(this.loginForm.value);
      this.router.navigate(["/"]);
    } else {
      this.hasError = true;
      this.error = "The combination of user and role does not exist!";
    }
  }

}
