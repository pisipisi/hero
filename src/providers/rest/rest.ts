import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl:string = "http://localhost:3000";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  public login(email, password) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/users/login', {email: email, password: password})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public fbLogin(userdetail) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/users/fblogin', userdetail)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
