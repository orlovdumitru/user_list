import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
    { path: 'users/:id', component: UsersDetailsComponent},
    { path: 'new_user', component: UsersHomeComponent },
    { path: 'edit_user/:id', component: EditUserComponent },
    { path: '', component: UsersListComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}