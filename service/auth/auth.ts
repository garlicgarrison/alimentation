import firebase from "../../firebase/config"
import "firebase/auth"
import 'firebase/firestore'
import { AddressObj, Name } from "../../models/users";

let db = firebase.firestore();

export const emailSignup =  (email: string, password: string) =>  {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(async (user) => {
        let email = user.user.email;
        let emailArr = email.split("@");
        let newUsername = emailArr[0];
        await firebase.auth().currentUser.updateProfile({
            displayName: newUsername,
            photoURL: `https://avatars.dicebear.com/api/gridy/${newUsername}.svg`
        })
        return user;
    }).catch(error=> {
        return error;
    })
}

export const emailLogin = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        return user;
    }).catch(error => {
        return error;
    })
}

export const facebookAuth = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(async user => {
        return user;
    }).catch(error => {
        return error;
    })
}

export const googleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(async user => {
        return user;
    }).catch(error => {
        return error;
    })
}

export const logout = () => {
    return firebase.auth().signOut();
}

export const setUserInfo = (address: AddressObj, name: Name, phone: string) => {
    return db.collection("users").doc(firebase.auth().currentUser.uid).set({
        main_address: address,
        name: name,
        phone_number: phone
    })
}