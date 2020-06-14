import { ContactComponent } from './contact/contact.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: "contact", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "addressbook", loadChildren: () => import('./address-book/address-book.module').then(m => m.AddressBookModule) },
  { path: "departments", loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule) },
  { path: "titles", loadChildren: () => import('./titles/titles.module').then(m => m.TitlesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
