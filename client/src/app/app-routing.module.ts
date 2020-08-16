import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersHomeComponent } from './users-home/users-home.component';

const routes: Routes = [
    { path: 'users', component: UsersListComponent},
    { path: 'users/:id', component: UsersDetailsComponent},
    { path: '', component: UsersHomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}