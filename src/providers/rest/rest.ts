import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl:string = "http://192.168.77.114:3000";
  constructor(public http: HttpClient, private nativeStorage: NativeStorage) {
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

  public updateFCMToken(token) {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('helper').then(data => {
        
        if(data !== null) {
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': data.token });
          let options = { headers: headers };
          this.http.post(this.baseUrl+'/users/update-token', {token: token}, options)
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        }
      });
      
    });
  }
}
