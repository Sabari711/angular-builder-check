import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployersComponent } from './pages/employers/employers.component';
import { JobSeekersComponent } from './pages/job-seekers/job-seekers.component';
import { JobNewsComponent } from './pages/job-news/job-news.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ForEmployersComponent } from './pages/for-employers/for-employers.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FraudAlertComponent } from './pages/fraud-alert/fraud-alert.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {path:"services",component:EmployersComponent},
    {path:"job-seekers",component:JobSeekersComponent},
    {path:"employers",component:ForEmployersComponent},
    {path:"job-news",component:JobNewsComponent},
    {path:"contact-us",component:ContactUsComponent},
    {path:"terms-condition",component:TermsConditionsComponent},
    {path:"privacy-policy",component:PrivacyPolicyComponent},
    {path:"fraud-alert",component:FraudAlertComponent},
    // {path:"blog/:blog-data",component:BlogDetailsComponent},


];
