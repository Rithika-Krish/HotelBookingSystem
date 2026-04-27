import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { RegisterDto } from '../../../dto/RegisterDto';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 private auth = inject(AuthService);
  private router = inject(Router);
   registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  register(){
    const dto: RegisterDto = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!
    };
    this.auth.register(dto).subscribe({
      next: () => {
        alert("Registration is Successful");
        this.router.navigate(['/login']);
        },
      error: () => {
        alert("Registration Failed");
      },
    });

  }

}
