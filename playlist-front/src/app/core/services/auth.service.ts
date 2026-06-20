import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { AuthResponse, SignInRequest, SignUpRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly tokenService: TokenService,
  ) {}

  signIn(data: SignInRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/sign-in', data).pipe(
      tap((response) => {
        this.tokenService.saveTokens(response.accessToken, response.refreshToken);
      }),
    );
  }

  signUp(data: SignUpRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/sign-up', data).pipe(
      tap((response) => {
        this.tokenService.saveTokens(response.accessToken, response.refreshToken);
      }),
    );
  }

  logout(): void {
    this.tokenService.clearTokens();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  me(): Observable<{ sub: string; email: string }> {
    return this.apiService.get<{ sub: string; email: string }>('/auth/me');
  }
}
