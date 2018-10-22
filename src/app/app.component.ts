import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	title = 'firebaseauth';

  	constructor(private auth: AuthenticationService) {}
  	
  	ngOnInit() {
  		this.auth.getSignWithRedirectResult()
  			.then(result => {
  				console.log("Result", result);
  			}, err => {
  				console.log("Error: ", err);
  			})
  	}

  	signIn(){
  		this.auth.signInWithProvider('GOOGLE', 'redirect').then((res) => {
  			console.log("Res", res);
  		})
  		.catch(err => {
  			console.log(err);
  		}) 
  	}
}
