// login.component.ts
// 🌺 Login Component - A serene gateway to authenticate users with a redirect, standalone style.
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.http.post('/login', { email: this.email, password: this.password }).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check your network or server status.';
        } else if (err.status === 400) {
          this.errorMessage = 'Bad request. Please check your input.';
        } else if (err.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        } else if (err.status === 403) {
          this.errorMessage = 'You do not have permission to access this resource.';
        } else if (err.status === 404) {
          this.errorMessage = 'Login service not found. Please contact support.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}