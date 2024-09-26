import { Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {path: '', component: EmailComponent},
    {path: 'email', component: EmailComponent},
    {path: 'user', component: UserComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];
