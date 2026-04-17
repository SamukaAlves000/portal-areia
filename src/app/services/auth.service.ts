import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = signal(false);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(private router: Router) {
    if (this.isBrowser) {
      const auth = localStorage.getItem('admin_auth');
      if (auth === 'true') {
        this._isAuthenticated.set(true);
      }
    }
  }

  isAuthenticated() {
    return this._isAuthenticated();
  }

  login(user: string, pass: string): boolean {
    if (user === 'ADMIN' && pass === 'ADMIN123') {
      this._isAuthenticated.set(true);
      if (this.isBrowser) {
        localStorage.setItem('admin_auth', 'true');
      }
      return true;
    }
    return false;
  }

  logout() {
    this._isAuthenticated.set(false);
    if (this.isBrowser) {
      localStorage.removeItem('admin_auth');
    }
    this.router.navigate(['/login']);
  }
}
