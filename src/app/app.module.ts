import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const fireConfig = {
	apiKey: "AIzaSyAWQ1ICmiYOSLomYXhD4cpyzAHYVpPEq6Y",
    authDomain: "client-panel-prod-c8e29.firebaseapp.com",
    databaseURL: "https://client-panel-prod-c8e29.firebaseio.com",
    projectId: "client-panel-prod-c8e29",
    storageBucket: "client-panel-prod-c8e29.appspot.com",
    messagingSenderId: "978131817476"
}
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireAuthModule,
    NgZorroAntdModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
