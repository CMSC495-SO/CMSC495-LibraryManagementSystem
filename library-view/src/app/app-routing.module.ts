import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* add components to router */
import {HomeComponent} from './pages/home/home.component'
import {SampleComponent} from './component/sample/sample.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
