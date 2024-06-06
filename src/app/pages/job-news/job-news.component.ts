import { Component, OnInit,PLATFORM_ID,
  Inject, } from '@angular/core';
import AOS from 'aos'
import { environment } from '../../../environments/environment';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';


@Component({
  selector: 'app-job-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-news.component.html',
  styleUrl: './job-news.component.css'
})
export class JobNewsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private api:ApiServiceService){}
  // baseUrl:string = environment.apiUrl+"blog/";
  baseUrl:string = environment.frontEndUrl;
  latestBlog:any= {};
  lastThreeBlogs:any = [];
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.getRecentBlogs();
    // console.log(Object.entries(this.latestBlog).length === 0);
    
    AOS.init();
  }
  getRecentBlogs(){
    this.api.getBlogs().subscribe((data:any)=>{
      if(data.status){
        this.latestBlog = data.recentData
        console.log(this.latestBlog);
        
        this.lastThreeBlogs = data.latestBlogs
      }
    })
  }

}
