import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactUser } from '../interFaces/contact-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = environment.apiUrl;

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
  EmployerFormSubmit(data:any){
    return this.http.post(`${this.apiUrl}employers-submit`,data)
  }
  getBlogs(){
    return this.http.get(`${this.apiUrl}get-recent-blogs`)
  }
  blogDetail(seo_url:string){
    let data = {
      seoUrl : seo_url
    }
    return this.http.post(`${this.apiUrl}blog-details`,data)
  }
}
