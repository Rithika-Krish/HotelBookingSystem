import { Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { LoginDto } from '../../../dto/LoginDto';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

private auth = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  login() {

    const dto: LoginDto = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.auth.login(dto).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); 
      },
      error: () => {
        alert('Invalid username or password ');
      }
    });
  }

}
