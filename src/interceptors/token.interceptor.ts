import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from 'src/app/components/auth/auth.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,private http:HttpClient,private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.auth.getAccessToken();

    if (!this.auth.isExpire(accessToken) && accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
//  console.log(request)
    // Ajoutez une vérification pour éviter la boucle infinie
    if (!request.url.includes('/token')) {
      //console.log(request)
      return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {

        if (err.status === 401 && this.auth.getRefreshToken()) {

          // request = request.clone({
          //   headers: request.headers.delete('authorization')
          // });
          // console.log(request)
          let refreshToken = localStorage.getItem('refreshToken');
          let grantType = "refreshToken";
          if (!this.auth.isLogged()){
            return this.http.post(environment.host + "/token", { refreshToken, grantType }).pipe(
              switchMap((res: any) => {
                localStorage.removeItem('accessToken')
                localStorage.setItem('accessToken', res.accessToken)
                // console.log(res.accessToken);

                return next.handle(request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${(res.accessToken)}`
                  }
                }));
              })
            );
          }else{
            this.router.navigate(['/login'])
            return next.handle(request);
          }
          // console.log(refreshToken)

        }
        this.router.navigate(['/login'])
        return throwError(() =>err);
      }));
    } else {
      // Si la demande est une demande de renouvellement du jeton, ne pas intercepter
      return next.handle(request);
    }

  }
}
