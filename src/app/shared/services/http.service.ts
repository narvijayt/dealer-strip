import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    withCredintials: false
  };

  post(serviceName: string, data: any) {
    const url = environment.apiUrl + serviceName;    
    return this.http.post(url, JSON.stringify(data), this.httpOptions);
  }

  get(serviceName: string) {
    let url = environment.apiUrl + serviceName;
    console.log("Endpoint URL ", url);
    return this.http.get(url, this.httpOptions);
  }

  put(serviceName: string, id:any, data: any) {
    let url = environment.apiUrl + serviceName + '/' + id;
    return this.http.put(url, JSON.stringify(data), this.httpOptions);
  }

  delete(serviceName: string, data: any = '') {
    let url = (data!='') ? environment.apiUrl + serviceName + '/' + data : environment.apiUrl + serviceName;
    return this.http.delete(url, this.httpOptions);
  }

}
