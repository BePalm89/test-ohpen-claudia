import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

const testUserData = { username: "User 1", role: 'administrator'};
const loginErrorMsg = 'Invalid Login';
const validUser = {
    username: 'User 1',
    role: 'administrator'
};

const blankUser = {
    username: '',
    role: ''
};

describe('Login Component Isolated Test', () => {
    
    let component: LoginComponent;
  ​
    beforeEach(async(() => {
      component = new LoginComponent(new FormBuilder(), authServiceSpy, routerSpy);
    }));
  ​
    function setForm(username, role) {
      component.loginForm.controls['username'].setValue(username);
      component.loginForm.controls['role'].setValue(role);
    }
  ​
    it('Component successfully created', () => {
      expect(component).toBeTruthy();
    });
  ​
    it('component initial state', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.invalid).toBeTruthy();
      expect(component.hasError).toBeFalsy();
      expect(component.error).toBeFalsy();
    });
  ​
    it('form value should update from when you change the input', (() => {
      setForm(validUser.username, validUser.role);
      expect(component.loginForm.value).toEqual(validUser);
    }));
  ​
    it('Form invalid should be true when form is invalid', (() => {
      setForm(blankUser.username, blankUser.role);
      expect(component.loginForm.invalid).toBeTruthy();
    }));
});


describe('Login Component Shallow Test', () => {

    let fixture: ComponentFixture<LoginComponent>;
  
    function setForm(username, role) {
      fixture.componentInstance.loginForm.controls['username'].setValue(username);
      fixture.componentInstance.loginForm.controls['role'].setValue(role);
    }
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [BrowserAnimationsModule,
          ReactiveFormsModule],
        providers: [
          {provide: AuthService, useValue: authServiceSpy},
          FormBuilder,
          { provide: Router, useValue: routerSpy }
        ],
        declarations: [LoginComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(LoginComponent);
    }));
  
    it('created a form with username and role input and login button', () => {
      const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username');
      const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn');
      expect(usernameContainer).toBeDefined();
      expect(loginBtnContainer).toBeDefined();
    });
  
    it('Display Username Error msg when Username is blank', () => {
      setForm(blankUser.username, validUser.role);
      fixture.detectChanges();
  
      const button = fixture.debugElement.nativeElement.querySelector('#login-btn');
      button.click();
      fixture.detectChanges();
  
      const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('.alert-danger');
      expect(usernameErrorMsg).toBeDefined();
      expect(usernameErrorMsg.innerHTML).toContain('Username is required');
    });
});
