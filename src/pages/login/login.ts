import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase  from 'firebase/app';

import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';



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
              public usuarioProv: UsuarioProvider) {

  }


  signInWithFacebook(){
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
