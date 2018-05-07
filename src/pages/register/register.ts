import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/observable';

import {HashTableProvider} from "../../providers/hash-table/hash-table";
import {Wallet} from "../../app/models/Wallet";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage implements OnInit{

    @ViewChild('username') user;
    @ViewChild('password') password;


    wallet:Wallet = { //filled in by form in home.html
        id : '',
    totalamount : 0,
    bitcoinamount : 0, //? - optional
    ethereumamount : 0,
    litecoinamount : 0,
    ripplecurrencyamount : 0,
    transaction : ''
    }

    userId:string;

    constructor(private walletService: HashTableProvider,
                private alertCtrl: AlertController,
                private fire: AngularFireAuth,
                public navCtrl: NavController,
                public navParams: NavParams){


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');

    }

    ngOnInit(){

    }

    alert(message: string) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }

    registerUser() {
        this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
            .then(data => {
                console.log('got data', data);
                this.alert('Registered');

                this.userId = this.fire.auth.currentUser.uid;
                this.onReg(this.userId);

                //console.log('uid',this.fire.auth.currentUser.uid);

                console.log("new user id", this.userId);
            })
            .catch(error => {
                console.log('got an error', error);
                this.alert(error.message);
            });
        console.log('Would register user with', this.user.value, this.password.value);
    }

    onReg(uid: string){
        this.wallet.id = this.userId;
        this.walletService.addNewWallet(this.wallet, this.userId);//, this.userId); //pass in item which is submitted through the form
    }

}
