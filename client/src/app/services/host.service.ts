import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  host: string = 'http://localhost:8000/api/v1/';
  constructor() { }

  getHost(){
    return this.host;
  }
}
