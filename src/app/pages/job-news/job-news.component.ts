import { Component, OnInit,PLATFORM_ID,
  Inject, } from '@angular/core';
import AOS from 'aos'
import { environment } from '../../../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ApiServiceService } from '../../services/api-service.service';


@Component({
  selector: 'app-job-news',
  standalone: true,
  imports: [],
  templateUrl: './job-news.component.html',
  styleUrl: './job-news.component.css'
})
export class JobNewsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private api:ApiServiceService){}
  baseUrl:string = environment.frontEndUrl;
  latestBlog:any;
  lastThreeBlogs:any;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.getRecentBlogs();
    // AOS.init();
  }
  getRecentBlogs(){
    this.api.getBlogs().subscribe((data:any)=>{
      if(data.status){
        this.latestBlog = data.recentData
        this.lastThreeBlogs = data.latestBlogs
      }
    })
  }

}
