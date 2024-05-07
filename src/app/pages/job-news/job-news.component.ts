import { Component, OnInit,PLATFORM_ID,
  Inject, } from '@angular/core';
import AOS from 'aos'
import { environment } from '../../../environments/environment';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-job-news',
  standalone: true,
  imports: [],
  templateUrl: './job-news.component.html',
  styleUrl: './job-news.component.css'
})
export class JobNewsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
  baseUrl:string = environment.frontEndUrl;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    // AOS.init();
  }

}
