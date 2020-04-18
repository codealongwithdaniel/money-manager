import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostService } from './host.service';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient, private hostService: HostService, public storage: Storage) { }

  registerUser(data){
    return this.http.post(this.hostService.getHost()+'user/register', data);
  }

  loginUser(data){
    return this.http.post(this.hostService.getHost()+'user/login', data);
  }

  getAllCategories(){
    return new Promise((resolve, reject)=>{
      this.storage.get('token')
      .then((val) => {
        let httpOptions = new HttpHeaders({
          'Authorization': `Bearer ${val}`
        });
        resolve(this.http.get(this.hostService.getHost()+'category/getAll', {headers: httpOptions}));
      });
    })
  }

  addTransaction(data){
    // let httpOptions;
    return new Promise((resolve, reject)=>{
      this.storage.get('token')
      .then((val) => {
        let httpOptions = new HttpHeaders({
          'Authorization': `Bearer ${val}`
        });
        resolve(this.http.post(this.hostService.getHost()+'transaction/add', data, {headers: httpOptions}));
      });
    })
    
  }

  getAllTransaction(data){
    return new Promise((resolve, reject)=>{
      this.storage.get('token')
      .then((val) => {
        let httpOptions = new HttpHeaders({
          'Authorization': `Bearer ${val}`
        });
        resolve(this.http.post(this.hostService.getHost()+'transaction/getAll', data, {headers: httpOptions}));
      });
    })
  }

  getChartData(data){
    return new Promise((resolve, reject)=>{
      this.storage.get('token')
      .then((val) => {
        let httpOptions = new HttpHeaders({
          'Authorization': `Bearer ${val}`
        });
        resolve(this.http.post(this.hostService.getHost()+'transaction/getChartData', data, {headers: httpOptions}));
      });
    })
  }

  addCategory(data){
    return new Promise((resolve, reject)=>{
      this.storage.get('token')
      .then((val) => {
        let httpOptions = new HttpHeaders({
          'Authorization': `Bearer ${val}`
        });
        resolve(this.http.post(this.hostService.getHost()+'category/add', data, {headers: httpOptions}));
      });
    })
  }
}
