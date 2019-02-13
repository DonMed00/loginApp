import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase  from 'firebase/app';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              private fb: Facebook,
              private google: GooglePlus,
              private platform: Platform) {

  }


  signInWithGoogle(){
    if (this.platform.is('cordova')){
        return this.google.login(['email', 'public_profile']).then(res => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
          return firebase.auth().signInWithCredential(googleCredential).then(user => {
            this.usuarioProv.cargarUsuario(
              user.displayName,
              user.email,
              user.photoURL,
              user.uid,
              'google'
            );
            this.navCtrl.setRoot(HomePage);
          }).catch(e => {
            console.log("Error con el login" + JSON.stringify(e))
          });
        })

    }else{
    this.afAuth.auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(res => {
    console.log(res);

    let user = res.user;
    this.usuarioProv.cargarUsuario(
      user.displayName,
      user.email,
      user.photoURL,
      user.uid,
      'google'
    );

    this.navCtrl.setRoot(HomePage);
  });
}
}

signInWithFacebook(){
  if (this.platform.is('cordova')){
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential).then(user => {
          this.usuarioProv.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          );
          this.navCtrl.setRoot(HomePage);
        }).catch(e => {
          console.log("Error con el login" + JSON.stringify(e))
        });
      })

  }else{
  this.afAuth.auth
  .signInWithPopup(new firebase.auth.FacebookAuthProvider())
.then(res => {
  console.log(res);

  let user = res.user;
  this.usuarioProv.cargarUsuario(
    user.displayName,
    user.email,
    user.photoURL,
    user.uid,
    'facebook'
  );

  this.navCtrl.setRoot(HomePage);
});
}
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
