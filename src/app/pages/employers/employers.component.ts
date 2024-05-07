import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiServiceService } from '../../services/api-service.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import AOS from'aos'
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatDialogModule,RouterModule],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.css',
  providers:[ApiServiceService]
})
export class EmployersComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object){}
  baseUrl:string = environment.frontEndUrl;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    // AOS.init();
  }
  scrollToElement($element:any): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log($element);
      $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }
  
}
