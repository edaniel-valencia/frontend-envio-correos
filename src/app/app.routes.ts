import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { EmailComponent } from './email/email.component';
import { UserComponent } from './user/user.component';
import { CategoryUserComponent } from './category-user/category-user.component';
import { ConfigComponent } from './config/config.component';
import { MarketingComponent } from './marketing/marketing.component';

export const routes: Routes = [
    {path: '', component: EmailComponent},
    {path: 'email', component: EmailComponent},
    {path: 'user', component: UserComponent},
    {path: 'group', component: CategoryComponent},
    {path: 'masive', component: MarketingComponent},
    {path: 'setting-server', component: ConfigComponent},
    {path: 'userGroupId/:Cid', component: CategoryUserComponent},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];
