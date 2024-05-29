import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiServiceService } from '../../services/api-service.service';
import { PopUpComponent } from '../pop-up/pop-up.component';
import AOS from 'aos';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-for-employers',
  standalone: true,
  imports: [
    MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
  ],
  templateUrl: './for-employers.component.html',
  styleUrl: './for-employers.component.css',
  providers:[
    ApiServiceService
  ]
})
export class ForEmployersComponent implements OnInit {
  constructor(
    public apiServices: ApiServiceService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  baseUrl: string = environment.frontEndUrl;
  employersForm!: FormGroup;
  ngOnInit(): void {
    this.employersForm = this.fb.group({
      empName: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(3),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      contactNo: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      roleCate: ['',[Validators.required]],
      compWebsite: ['',[Validators.required]],
      noOfEmp: ['',[Validators.required]],
      jobDesc: ['', [Validators.required, Validators.maxLength(500)]],
      // resume_img: ['', [Validators.required]],
    });

    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    // AOS.init()
  }

  submit(): any {
    if (this.employersForm.valid) {


      this.apiServices
        .EmployerFormSubmit(
          this.employersForm.value,
        )
        .subscribe((data: any) => {
          console.log('data', data);
          if (data.status) {
            const dialogRef = this.dialog.open(PopUpComponent);
  
              dialogRef.afterClosed().subscribe((result) => {
                location.reload();
              });
          } else {
            this.toastr.error(data.message);
          }
        });
    } else {
      this.toastr.error('Please fill all the require fields');
    }
  }
  // preview: any;
  // selectFile(event: any) {
  //   const file = event.target.files[0];
  //   const allowedTypes = [
  //     'application/pdf',
  //     'application/msword'
  //   ];

  //   if (file && allowedTypes.includes(file.type)) {
  //     this.employersForm.patchValue({
  //       resume_img: file,
  //     });
  //     // this.employersForm.get('resume_img')?.updateValueAndValidity();

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.preview = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //     // console.log(file);
  //   } else {
  //     // Handle invalid file type error
  //     console.log('Invalid file type. Please select a PDF or DOC file.');
  //     this.toastr.error('Invalid file type. Please select a PDF or DOC file.');
  //   }
  // }
}

