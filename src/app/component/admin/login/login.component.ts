import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../shared/module/material';
import { AuthService } from '../../../shared/service/api/admin/auth.service';
import { StorageService } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm!: FormGroup;
  isShowPassword: boolean = false;

  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.controls['username'].value;
      const password = this.loginForm.controls['password'].value;
      this.subscription.add(
        this.authService.login(username, password).subscribe(res => {
          if (res.statusCode === 200) {
            const token = res.metaData;
            this.storageService.setItem('accessToken', token.accessToken);
            this.storageService.setItem('refreshToken', token.refreshToken);
            this.router.navigate(['/admin']);
          }
        })
      )
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
