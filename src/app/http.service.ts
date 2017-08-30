import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  constructor(private http: Http) {

  }

  getService() {
     console.log('http service started..');
     return this.http.get('/mycontactapp').map(res => res.json());
    }

  postService(contact: object) {
    console.log(contact);
    return this.http.post('/mycontactapp', contact).map(res => res.text());
  }

  deleteService(id) {
    console.log('in delete');
    return this.http.delete('/mycontactapp/' + id).map(res => res.text());
  }

  editService(id) {
    console.log('in edit' + id);
    return this.http.get('/mycontactapp/' + id).map(res => res.json());
  }
  updateService(id, contact: object) {
    console.log('in update' + id);
    return this.http.put('/mycontactapp/' + id, contact).map(res => res.json());
  }
  loginService(login: object) {
    console.log(login);
    return this.http.post('/logindata', login).map(res => res.json());
  }
  logoutService() {
    console.log('logout');
    return this.http.get('/logout').map(res => res.json());
  }
  signupService(signup: object) {
    console.log('signup');
    return this.http.post('/signup', signup).map(res => res.json());
  }
  searchService(name) {
    return this.http.get('/search/' + name).map(res => res.json());
  }
  findService(id) {
    return this.http.get('/find/' + id).map(res => res.json());
  }

  }

