import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* add components to router */
import {HomeComponent} from './pages/home/home.component'
import {SampleComponent} from './component/sample/sample.component'
import {AboutusComponent} from './pages/aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  },
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
