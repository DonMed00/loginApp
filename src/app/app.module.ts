import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';



import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { UsuarioProvider } from '../providers/usuario/usuario';



var config = {
    apiKey: "AIzaSyDjP0oWZz93dkVzJ8GNyvRuiU8EI4GYUDU",
    authDomain: "tracker-taxis-e9aa5.firebaseapp.com",
    databaseURL: "https://tracker-taxis-e9aa5.firebaseio.com",
    projectId: "tracker-taxis-e9aa5",
    storageBucket: "tracker-taxis-e9aa5.appspot.com",
    messagingSenderId: "804149833017"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    UsuarioProvider
  ]
})
export class AppModule {}
