import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
export interface AuthResponse {
  accessToken: string;
  refreshToken: string

}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  LoginFormGroup!: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.LoginFormGroup = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  Login() {

    this.authService.Authenticate(this.LoginFormGroup.value).subscribe(response => {
const res=response.body as AuthResponse
       localStorage.setItem('accessToken',res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      this.router.navigateByUrl('/admin')
    })



  }

}
