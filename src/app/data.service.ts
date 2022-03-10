import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //new


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) {
    
   }

   uploadData(data: any){ //obtener la url
    const headers = new HttpHeaders();
    return this.http.post(this.apiUrl+'/api/file/', data, {
      headers: headers
    });
    
  }
}
 
