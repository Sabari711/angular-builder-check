import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  testId !: string;

  constructor(private route: ActivatedRoute,private api:ApiServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testId = params['blog-data']; // Access the 'id' parameter from the URL
    });
    this.getBlog();
  }

  getBlog(){
    this.api.blogDetail(this.testId).subscribe((data:any)=>{
      console.log("data",data);
    })
  }


}
