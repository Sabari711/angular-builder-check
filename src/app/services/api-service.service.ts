import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactUser } from '../interFaces/contact-user';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  UsersConatctSubmit(data:any){
    return this.http.post(`${this.apiUrl}contact-user`,data)
  }
}
