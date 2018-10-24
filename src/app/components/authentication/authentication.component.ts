import { Component, OnInit } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd';

import { AuthenticationService } from '../../services/authentication/authentication.service';

import { auth } from 'firebase/app';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
	// showRegisterWithEmail: boolean = false;
	showRegisterWithEmail: boolean = false;
	showSignInWithEmail: boolean = false;
	newUser: { email: string, password: string } = {
		email: '',
		password: ''
	}

	user: { email: string, password: string } = {
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
  				this.newUser = {email: '', password: ''};
  				this.showNotification('Account Created', 'Account created successfully.', 'success');
  			}, (error) => {
  				console.log("Error Response: ", error);
  				this.showNotification('Account not created', error.message, 'error');
  			});
  	}

  	signInWithEmail() {
  		this.authService.signInWithEmail(this.user.email, this.user.password)
  			.then((response) => {
  				console.log("Response: ", response);
  				this.user = {email: '', password: ''};
  				this.showNotification('Hi ' + response['user']['email'], 'You are logged in successfully.', 'success');
  			}, (error) => {
  				this.showNotification('Error while Signing In', error.message, 'error');
  			})
  	}

  	signInWithProvider(provider: 'GOOGLE' | 'FB' | 'TWITTER' | 'GITHUB') {
  		this.authService.signInWithProvider(provider, 'popup')
  			.then((response) => {
  				console.log("Response: ", response);
  				this.showNotification('Hi ' + response['email'], 'You are logged in successfully.', 'success');
  			}, (error) => {
  				this.showNotification('Error while Signing In', error.message, 'error');
  			});
  	}

  	showNotification(title: string, content: string, type: 'success' | 'error' | 'warning' | 'info') {
  		this.notification.create(type, title, content, {
  			nzDuration: 2000,
  			nzPauseOnHover: true
  		});
  	}
}
