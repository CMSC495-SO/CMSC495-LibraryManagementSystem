import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

/*custom modules*/
import { AppRoutingModule } from './app-routing.module';
import {BaseDialogModule} from "./component/base-dialog";

/*imported components*/
import { AppComponent } from './app.component';
import { SampleComponent } from './component/sample/sample.component';
import { FooterComponent } from './component/footer/footer.component';
import { AppToolbarComponent } from './component/app-toolbar/app-toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    FooterComponent,
    AppToolbarComponent,
    HomeComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BaseDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
