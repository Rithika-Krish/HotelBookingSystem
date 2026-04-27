import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto } from '../dto/LoginDto';
import { tap } from 'rxjs';
import { RegisterDto } from '../dto/RegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http=inject(HttpClient)
  private authurl="https://localhost:7206/api/Auth";

  
  login(dto: LoginDto) {
    return this.http.post<{ token: string }>(`${this.authurl}/Login`, dto).pipe(
      tap(res => {
        localStorage.setItem('token', res.token); 
      })
    );
  }

  register(dto:RegisterDto){
    return this.http.post(`${this.authurl}/Register`,dto);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return  !!this.getToken();
  }
  logout(){
    localStorage.removeItem('token');
    
  }
}
