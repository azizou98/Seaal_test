// register.component.ts
// 🌹 Register Component - A welcoming form to create new user accounts with standalone power.
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [RouterLink,FormsModule, CommonModule] // 📦 Importing needed modules directly.
})
export class RegisterComponent {
  username: string;
  email: string;
  password: string;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
   this.email = '';           // initialized with empty string
   this.password = '';
   this.username = ''; 
  }

  register() {
    this.errorMessage = '';
    this.http.post('http://localhost:3000/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => this.router.navigate(['/articles']),
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = err.error.error; // Shows "Email already exists" or "Username already exists"
        } else {
          this.errorMessage = 'Registration failed. Please try another username.';
        }
      }
    });
  }
}