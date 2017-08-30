import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [HttpService]
})
export class SigninComponent implements OnInit {
  login = {username: String, password: String};
  stat = '';

  constructor(private httpservice: HttpService, private route: Router) {
    this.login.username = this.login.password = null;
  }

  ngOnInit() {
  }

  submit() {
    this.httpservice.loginService(this.login).subscribe(res => {
      if (res.flag) {
        this.route.navigate(['/contacts/' + res.user]);
      } else {
        console.log(this.login);
        if (this.login.username == null || this.login.password == null) {
          this.stat = 'please fill the required data';
        }else {
          this.stat = 'invalid credentials!!';
          this.login.username = this.login.password = null;
        }
      }
    });
  }

  signup() {
    this.route.navigate(['/signup']);
  }
}
