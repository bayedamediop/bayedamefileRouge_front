import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  formLogin: FormGroup;
  submitted = false;
  private token: string;
  constructor( private authService: AuthService, private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit(): any{
    this.formLogin = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(4)]]
    });
  }
  get f(): any{
    return this.formLogin.controls ;
  }
  onSubmit(): any {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    this.authService.login(this.f.email.value, this.f.password.value).subscribe(
      role => {
      // console.log(this.authService.getToken());
      console.log(role);
    }, (error) => {
        console.log(error);
    });
  }
  }