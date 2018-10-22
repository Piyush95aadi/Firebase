import { Component, OnInit } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
	// showRegisterWithEmail: boolean = false;
	newUser: { email: string, password: string} = {
		email: '',
		password: ''
	}

  	constructor(
  		private authService: AuthenticationService,
  		private notification:NzNotificationService
  	) {}

  	ngOnInit() {}

  	register() {
  		this.authService.signupWithEmail(this.newUser.email, this.newUser.password)
  			.then((response) => {
  				console.log("Signup Response: ", response);
  				this.showNotification('Account Created', 'Account created successfully.', 'success');
  			}, (error) => {
  				console.log("Error Response: ", error);
  				this.showNotification('Account not created', error.message, 'error');
  			});
  	}

  	signInWithEmail() {

  	}

  	showNotification(title: string, content: string, type: 'success' | 'error' | 'warning' | 'info') {
  		this.notification.create(type, title, content, {
  			nzDuration: 2000,
  			nzPauseOnHover: true
  		});
  	}
}
