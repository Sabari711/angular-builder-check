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
  UsersJobSubmit(formVal:any,file:File){
    const formData = new FormData();

    formData.append('resume_img',file),
    formData.append('name',formVal.name),
    formData.append('location',formVal.location),
    formData.append('email',formVal.email),
    formData.append('phoneNo',formVal.phoneNo);
    formData.append('linkedInLink',formVal.linkedInLink);
    formData.append('shortIntro',formVal.shortIntro)

    return this.http.post(`${this.apiUrl}job-user`,formData)

  }
  getBlogs(){
    return this.http.get(`${this.apiUrl}get-recent-blogs`)
  }
}
