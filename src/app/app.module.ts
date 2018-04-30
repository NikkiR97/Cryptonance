import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular'; //imports all the ionic functionality
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {LoggedinPage} from '../pages/loggedin/loggedin';
import {BitcoinPage} from '../pages/currencypage/bitcoinpage/bitcoinpage';
import {LitecoinPage} from '../pages/currencypage/litecoinpage/litecoinpage';
import {EthereumPage} from '../pages/currencypage/ethereumpage/ethereumpage';
import {RipplePage} from '../pages/currencypage/ripplepage/ripplepage';

import {AccountPage} from "../pages/accountpage/accountpage";
import {CurrencyPage} from "../pages/currencypage/currencypage";

const firebaseAuth = {
    apiKey: "AIzaSyC4bTy3yTV6NAdtLTLi8yZSiXc7bAv_nYU",
    authDomain: "cryptonance-444b1.firebaseapp.com",
    databaseURL: "https://cryptonance-444b1.firebaseio.com",
    projectId: "cryptonance-444b1",
    storageBucket: "cryptonance-444b1.appspot.com",
    messagingSenderId: "480834052882"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        LoggedinPage,
        AccountPage,
        BitcoinPage,
        CurrencyPage,
        EthereumPage,
        LitecoinPage,
        RipplePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp), //use instead of browser module
        AngularFireModule.initializeApp(firebaseAuth),
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        RegisterPage,
        LoggedinPage,
        AccountPage,
        BitcoinPage,
        CurrencyPage,
        EthereumPage,
        LitecoinPage,
        RipplePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}


    ]
})
export class AppModule {
}
