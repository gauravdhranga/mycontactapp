import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import {RouterModule, Routes} from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'contacts/:id', component: ContactsComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  declarations: [
    SigninComponent,
    AppComponent,
    ContactsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
