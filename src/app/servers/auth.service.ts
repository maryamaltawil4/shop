import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient : HttpClient) { 

  }

  register(user:any) :Observable<any>{
     return this._HttpClient.post("https://ecommerce-node4-five.vercel.app/auth/signup",user); 
  }

}
