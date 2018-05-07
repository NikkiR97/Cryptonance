// import { Injectable } from '@angular/core';
//
// /*
//   Generated class for the HashTableProvider provider.
//
//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */
// @Injectable()
// export class HashTableProvider {
//
//   constructor() {
//     console.log('Hello HashTableProvider Provider');
//   }
//
//   oneplusone() {
//   	this.alert(1+1);
//   }
//
// }

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseObjectObservable} from "angularfire2/database-deprecated";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { switchMap } from 'rxjs/operators';
import { Wallet } from '../../app/models/Wallet'; //export allows use in other files
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class HashTableProvider {
    // itemsCollection: AngularFirestoreCollection<Item>; //type: item
    // items: Observable<Item[]>;
    // itemDoc: AngularFirestoreDocument<Item>; //type: item

    walletsCollection: AngularFirestoreCollection<Wallet>; //type: item
    //wallets: FirebaseListObservable<Wallet[]> = null;//FirebaseList
    wallets: Observable<Wallet[]>;

    walletDoc : AngularFirestoreDocument <Wallet>;

    userwallet : Observable<Wallet>;

    userId: string;
    //itemDoc: AngularFirestoreDocument<Wallet>; //type: item

     constructor(public afs: AngularFirestore,
                 public afAuth: AngularFireAuth){
         //private db: AngularFireDatabase) {
        // this.afAuth.authState.subscribe(user => {
        //     if (user) this.userId = user.uid
        // })

        this.userId = this.afAuth.auth.currentUser.uid;

        console.log('injector uid', this.userId);

        //this.walletsCollection = this.afs.collection('account info', ref => ref.orderBy('id', 'asc'));//.valueChanges(); // returns the collection as a observable

        this.walletsCollection = this.afs.collection('account info'); //ref()

        this.wallets = this.walletsCollection.snapshotChanges().map(changes => {
            //use snapshot changes and map the id
            //items is the collection
            return changes.map(a => {
                const data = a.payload.doc.data() as Wallet; //Wallet comes from the models folder
                data.id = a.payload.doc.id; //how you get the doc id
                return data;
            });
        });

         // this.walletsCollection = this.afs.collection('account info'); //ref()
         // this.wallets = this.walletsCollection.valueChanges();

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //this.walletDoc = afs.doc<Wallet>(`account info/${this.userId}`);

         this.walletDoc = this.getWalletDoc();

         // this.userwallet = this.walletDoc.valueChanges();

          this.userwallet = this.walletDoc.snapshotChanges().map(changes => {
            return changes.payload.data() as Wallet;
        });

         this.userwallet.subscribe(res=>{
             console.log("user's document:", res);
         });

     }

    // setUID() {
    //     this.afAuth.authState.subscribe(user => {
    //         if (user) this.userId = user.uid;
    //     })
    // }

    getWallet(){
         return this.userwallet;
    }

    getWallets() {
        return this.wallets;
    }

    addNewWallet(wallet: Wallet, uid: string) {
        this.afs.collection("account info").doc(uid).set({wallet})
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }

    deleteItem(wallet: Wallet) { //takes in wallet, type of Wallet
        this.walletDoc = this.afs.doc(`account info/${wallet.id}`); //picks a specific item
        this.walletDoc.delete(); //once you identified the specific item, it should delete
    }

    returnid() { //returns id of the user
        return this.userId;
    }

    getWalletDoc() : AngularFirestoreDocument<Wallet> {

        this.walletDoc = this.afs.collection('account info').doc(this.userId);
         //this.itemDoc = this.afs.doc(`account info/${this.userId}`);
         return this.walletDoc;
    }

    // getWalletsList() : Observable <Wallet[]>{
    //     if (!this.userId) return;
    //         this.wallets = this.db.list(`account info/${this.userId}`);
    //         return this.wallets
    // }

    // getItemsList(): Observable<Wallet[]> {
    //     if (!this.userId) return;
    //     this.wallets = this.db.list(`items/${this.userId}`);
    //     return this.wallets
    // }
    //
    // "rules": {
    //     "items": {
    //         "$uid": {
    //             ".read": "$uid === auth.uid",
    //             ".write": "$uid === auth.uid"
    //         }
    //     }
    // }
}