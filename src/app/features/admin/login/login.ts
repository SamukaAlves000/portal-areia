import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <mat-card class="w-full max-w-md p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary">Acesso Restrito</h1>
          <p class="text-gray-500">Área Administrativa</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Usuário</mat-label>
            <input matInput formControlName="username" placeholder="Digite seu usuário">
            <mat-icon matPrefix class="mr-2">person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Senha</mat-label>
            <input matInput [type]="hidePassword() ? 'password' : 'text'" formControlName="password" placeholder="Digite sua senha">
            <mat-icon matPrefix class="mr-2">lock</mat-icon>
            <button mat-icon-button matSuffix (click)="hidePassword.set(!hidePassword())" type="button">
              <mat-icon>{{hidePassword() ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
          </mat-form-field>

          @if (errorMessage()) {
            <p class="text-red-500 text-sm text-center font-medium">{{errorMessage()}}</p>
          }

          <button mat-flat-button color="primary" type="submit" class="w-full py-6 !rounded-xl !text-lg" [disabled]="loginForm.invalid">
            ENTRAR
          </button>
        </form>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = signal(true);
  errorMessage = signal('');

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username!, password!)) {
        this.router.navigate(['/admin/home']);
      } else {
        this.errorMessage.set('Usuário ou senha incorretos.');
      }
    }
  }
}
