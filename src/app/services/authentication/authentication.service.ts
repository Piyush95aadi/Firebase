import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private afAuth: AngularFireAuth) { }

	/**
		* Create new user with email and password
		* @param email		new user's email
		* @param password	new user's password
		* @return			new Promise containing non-null User Credential. See Google Firebase documentation at: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword	
  	*/
	signupWithEmail(email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth.createUserWithEmailAndPassword(email, password)
				.then((userData) => {
					// Do anything with the data here
					resolve(userData);
				}, (err) => {
					reject(err);
				})
		});
  	}

  	/**
		* Sign in using email and password
		* @param email		user's email
		* @param password	user's password
		* @return			new Promise containing non-null User Credential. See Google Firebase documentation at: https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
  	*/
  	signInWithEmail(email: string, password: string) {
  		return new Promise((resolve, reject) => {
  			this.afAuth.auth.signInWithEmailAndPassword(email, password)
  				.then(userData => resolve(userData), err => reject(err));
  		});
  	}

  	/**
		* Sign in with OAuth authentication providers - Google, FB, Twitter, Github
		* @param providerName		Name of the provider.
		* @param type				Method type of signin - Popup or redirect
		* @return					In case of signIn with Popup - new Promise containing non-null User Credential. See Google Firebase documentation at: https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
  	*/
  	signInWithProvider(providerName: string, type: 'popup' | 'redirect') {
  		let provider;
  		switch (providerName) {
  			case "GOOGLE":
  				provider = new auth.GoogleAuthProvider();
  				break;
  			case 'FB':
  				provider = new auth.FacebookAuthProvider();
  				break;
  			case 'TWITTER':
  				provider = new auth.TwitterAuthProvider();
  				break;
  			case 'GITHUB':
  				provider = new auth.GithubAuthProvider();
  				break;
  			default:
  				provider = null;
  				break;
  		}
  		return new Promise((resolve, reject) => {
			if(type === 'popup') {
				this.afAuth.auth.signInWithPopup(provider).then((result) => {
	  				// result.credentials.accessToken ,This gives you a Google Access Token. You can use it to access the Google API.
	  				resolve(result.user);
		  		}, (err) => {
		  			reject(err);
		  		});
			} else {
				this.afAuth.auth.signInWithRedirect(provider);
				resolve({result: {user: null}});
			}
			
  		});
  	}

  	/**
		* Get result of signin with redirect
		* @return	new Promise containing non-null User Credential. See Google Firebase documentation at: https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signInWithEmailAndPassword
  	*/
  	getSignWithRedirectResult() {
  		return new Promise((resolve, reject) => {
  			this.afAuth.auth.getRedirectResult()
				.then((result) => {
					// result.credentials.accessToken ,This gives you a Google Access Token. You can use it to access the Google API.
					console.log("Redirect result", result);
					resolve(result.user);
				}, (err) => {
					reject(err);
				});
  		});
  	}
}
