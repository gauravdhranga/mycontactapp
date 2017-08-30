import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [HttpService]
})
export class ContactsComponent implements OnInit {

  arr: object[] ;
  id: String;
  suggestion: object[];
  searchitem: string;
  enable: boolean;
  xyz = {_id: String, name: String , email: String, contact: Number};
  constructor(private httpservice: HttpService, private route: ActivatedRoute, private route2: Router) {
    this.refresh();

  }
  refresh() {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
    })
    this.httpservice.getService().subscribe(res => {
      if (!res.flag) {
        this.route2.navigate(['']);
      } else {
        this.arr = res.doc;
        console.log(this.arr);
        this.xyz.name = this.xyz.email = this.xyz.contact = this.xyz._id = null;
      }
    });
    this.enable = false;
  }
  addContact() {
    console.log(this.xyz);
    if (this.xyz.contact != null) {
    this.httpservice.postService(this.xyz).subscribe(res => {
      console.log(res);
      this.refresh();
    });
    } else {
      alert('please fill the contact field');
      }
}
  remove(id) {
    console.log(id);
    this.httpservice.deleteService(id).subscribe(res => {
      console.log('data deleted is' + res);
      this.refresh();
    });
  }
  edit(id) {
    console.log(id);
    this.httpservice.editService(id).subscribe(res => {
      console.log('data to be edited is' + res);
      this.xyz = res;
    });
  }
  update() {
    console.log(this.xyz._id);
    this.httpservice.updateService(this.xyz._id, this.xyz).subscribe(res => {
      console.log(res);
      this.refresh();
    });
  }
  search() {
    this.httpservice.searchService(this.searchitem).subscribe(res => {
        console.log(res);
        this.suggestion = res;
    });
  }
  logout() {
    this.httpservice.logoutService().subscribe(res => {
      console.log('logout successfully');
      this.route2.navigate(['']);
    });
  }
  find(id) {
    console.log(id);
    this.httpservice.findService(id).subscribe(res => {
      console.log(res[0].email);
      this.xyz.email = res[0].email;
      this.xyz.contact = res[0].contact;
      this.xyz.name = res[0].name;
    });
    this.suggestion = null;
    this.searchitem = null;
  }
  clear() {
    this.xyz.name = this.xyz.email = this.xyz.contact = this.xyz._id = null;
  }
  ngOnInit() {

  }
}



