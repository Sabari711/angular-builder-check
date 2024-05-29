import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  NgModule,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { environment } from '../../../environments/environment';
import AOS from 'aos';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio';

// import AOS from 'aos';
// import 'aos/dist/aos.css';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  swiperParams:any;
  constructor(
    public apiServices: ApiServiceService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private toastr : ToastrService
  ) {}

  baseUrl: string = environment.frontEndUrl;
  contactUsForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    category : new FormControl('candidate')
  });
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    
    // AOS.init();
  }
  submit(): any {
    // console.log(this.contactUsForm.value);
    
    if (isPlatformBrowser(this.platformId)) {
      if (this.contactUsForm.valid) {
        console.log(this.contactUsForm.value);
  
        this.apiServices
          .UsersConatctSubmit(this.contactUsForm.value)
          .subscribe((data: any) => {
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

  }

  ngAfterViewInit() {
    this.swiperParams = {
      breakpoints: {
        100: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 6,
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(this.swiperParams);
  }
}
