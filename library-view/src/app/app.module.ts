import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*custom modules*/
import { AppRoutingModule } from './app-routing.module';

/*imported components*/
import { AppComponent } from './app.component';
import { SampleComponent } from './component/sample/sample.component';
import { FooterComponent } from './component/footer/footer.component';
import { AppToolbarComponent } from './component/app-toolbar/app-toolbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
// import { LmsDialogComponent } from './component/lms-dialog/lms-dialog.component';
import { LoginComponent } from './component/login/login.component';

/*providers*/
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    FooterComponent,
    AppToolbarComponent,
    HomeComponent,
    AboutusComponent,
    /*LmsDialogComponent,*/
    LoginComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
