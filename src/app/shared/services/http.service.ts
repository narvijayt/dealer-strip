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
    // const headers = new HttpHeaders();
    // const options = { headers: headers, withCredintials: false };
    
    const url = environment.apiUrl + serviceName;    
    return this.http.post(url, JSON.stringify(data), this.httpOptions);
  }

}
