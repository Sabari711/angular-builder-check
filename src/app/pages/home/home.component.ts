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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ApiServiceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  constructor(
    public apiServices: ApiServiceService,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
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
  });
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    // AOS.init();
  }
  submit(): any {
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
            }
          });
      } else {
        // return false;
      }
    }

  }
}
