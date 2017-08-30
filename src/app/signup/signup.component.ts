import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup = {firstname: String, lastname: String, username: String, password: String};
  stat: string;
  constructor(private httpservice: HttpService, private route: Router) {
    this.signup.username = this.signup.password = this.signup.firstname = this.signup.lastname = null;
  }

  ngOnInit() {
  }
  add() {
    if (this.signup.username == null || this.signup.password == null || this.signup.firstname == null || this.signup.lastname == null) {
      this.stat = 'please provide the required data';
      this.signup.username = this.signup.password = this.signup.firstname = this.signup.lastname = null;
      console.log(this.signup);
    } else {
      this.httpservice.signupService(this.signup).subscribe(res => {
        console.log(res);
        this.route.navigate(['']);
      });
    }
  }
  login() {
    this.route.navigate(['']);
  }

}
