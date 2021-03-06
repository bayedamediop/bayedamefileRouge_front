import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private service: AuthService, private  router: Router) { }
  token: any;
  nameUserConnected: string;
  nom: string;
  prenom: string;
  idUserConnected: any;
  imageUser: string;
  photoExist = false;
  users: any;
  helper = new JwtHelperService() ;

  ngOnInit(): void {
    this.token = this.service.getToken() ;
    const tokenDecoded = this.helper.decodeToken(this.token);
   // console.log(tokenDecoded);
    this.nameUserConnected = tokenDecoded.username;
    // console.log(this.nameUserConnected);
    this.service.get().subscribe(data => {
      this.users = data;
      this.users.forEach((element: any) => {
        if (element.email === this.nameUserConnected) {
           // console.log('ok');
           this.idUserConnected = element.id;
           this.nom = element.nom;
           this.prenom = element.prenom;
           console.log(element.nom);
           if (element.avatar != null) {
            this.imageUser = element.avatar;
            this.photoExist = true;
            // console.log(this.imageUser);
            return;
          }
           return;
        }
      }) ;
    });
    // const tokenDecoded = this.helper.decodeToken(response.token) ;
  }

  // tslint:disable-next-line:typedef
  logout() {
    if (confirm('Are you sure you want logout?')) {
      const token = localStorage.getItem('token') ;
      localStorage.clear();
    }
  }
}
