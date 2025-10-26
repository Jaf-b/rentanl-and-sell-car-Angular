import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {carModel} from '../model/car-model';

export interface User {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
  }

  protected readonly url = "http://localhost:1000";
  protected readonly HttpClient: HttpClient = inject(HttpClient);

  jwt = localStorage.getItem('jwt');
  Admin = localStorage.getItem('IsAdmin');
  isAuthenticated = !!this.jwt;
  isAdmin = !!(this.Admin && this.Admin === "true");

  login(email: string, password: string) {
    return this.HttpClient.post<any>(`${this.url}/login`, {email: email, password: password})
  }
  sigin(email: string, password: string,IsAdmin:boolean) {
    return this.HttpClient.post<any>(`${this.url}/registration`, {email: email, password: password, IsAdmin:IsAdmin})
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('IsAdmin');
    this.jwt = null;
    this.isAdmin = false;
    this.isAuthenticated = false;
  }
  getValidationCode(){
    return this.HttpClient.get<string>(`${this.url}/code/validation`);
  }


}
