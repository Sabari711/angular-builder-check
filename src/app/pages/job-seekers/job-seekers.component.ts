import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiServiceService } from '../../services/api-service.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import AOS from 'aos';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-job-seekers',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './job-seekers.component.html',
  styleUrl: './job-seekers.component.css',
  providers:[ApiServiceService]
})
export class JobSeekersComponent implements OnInit {
  constructor(public apiServices: ApiServiceService,public dialog: MatDialog,@Inject(PLATFORM_ID) private platformId: Object) {}
  baseUrl:string = environment.frontEndUrl;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    // AOS.init()
  }
  jobApplyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15),Validators.minLength(3)]),
    location: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10),Validators.maxLength(10)]),
    linkedInLink:new FormControl(''),
    shortIntro: new FormControl('',[Validators.required,Validators.maxLength(256)]),
    resume_img:new FormControl(null,[Validators.required]),
  });

  submit():any{
    

    if(this.jobApplyForm.valid){
      console.log(this.jobApplyForm.value);

      // this.apiServices.UsersConatctSubmit(this.jobApplyForm.value).subscribe((data:any)=>{
      //   if(data.status){
      //     const dialogRef = this.dialog.open(PopUpComponent);
  
      //     dialogRef.afterClosed().subscribe(result => {
      //       location.reload()
      //     });
      //   }
      // })
    }else{
      // return false;
    }
  }
  preview:any;
  selectFile(event:any) {
    const file=event.target.files[0];
    this.jobApplyForm.patchValue({
      resume_img:file,
    });
    this.jobApplyForm.get('blog_img')?.updateValueAndValidity();
    const reader=new FileReader();
    reader.onload=()=>{
     this.preview=reader.result as string;
    }
    reader.readAsDataURL(file)
    console.log(file);
   }
}
