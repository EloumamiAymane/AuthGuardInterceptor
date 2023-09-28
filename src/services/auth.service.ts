import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host = environment.host

  constructor(private http: HttpClient) { }


  Authenticate(user: any) {
    let userRes = {
      username: user.username,
      password: user.password,
      grantType: "password",
      withRefreshToken: true
    }
    console.log(userRes)
    return this.http.post(this.host + "/token", userRes,{observe:'response'})
  }
  isExpire(access:any) {
    const now = new Date();//4 //3
    if (localStorage.getItem('accessToken')) {
      const expirationDate = new Date(JSON.parse
        (atob(localStorage.getItem('accessToken')!
          .split('.')[1]))
        .exp * 1000);
      return now < expirationDate ? false : true
    }
    return false;

  }

  isLogged(){
    const now = new Date();//4 //3
    if (localStorage.getItem('refreshToken')) {
      const expirationDate = new Date(JSON.parse
        (atob(localStorage.getItem('refreshToken')!
          .split('.')[1]))
        .exp * 1000);
      //console.log(expirationDate)
      return now < expirationDate ? false : true
    }
    return false;
  }
  getAccessToken(): string |null{
    return localStorage.getItem('accessToken')
  }

  getRefreshToken(): string|null {
    return localStorage.getItem('refreshToken')
  }

  getNewAccessToken() {
    let refreshToken= localStorage.getItem('refreshToken')
    let grantType= "refreshToken"

    return this.http.post(this.host + "/token", { refreshToken, grantType })
  }

  getData(): Observable<any> {
    return this.http.get(this.host + '/dataTest')

  }


}
