import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmployersComponent } from './pages/employers/employers.component';
import { JobSeekersComponent } from './pages/job-seekers/job-seekers.component';
import { JobNewsComponent } from './pages/job-news/job-news.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {path:"services",component:EmployersComponent},
    {path:"job-seekers",component:JobSeekersComponent},
    {path:"job-news",component:JobNewsComponent},
    {path:"contact-us",component:ContactUsComponent},
];
