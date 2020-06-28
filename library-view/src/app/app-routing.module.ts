import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* add components to router */
import {HomeComponent} from './pages/home/home.component'
import {AboutusComponent} from './pages/aboutus/aboutus.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutusComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
