import firebase from "../../firebase/config"
import "firebase/auth"

export const emailSignup = (email: string, password: string) =>  {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
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
    return firebase.auth().signInWithPopup(provider).then(user => {
        return user;
    }).catch(error => {
        return error;
    })
}

export const googleAuth = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(user => {
        return user;
    }).catch(error => {
        return error;
    })
}

export const logout = () => {
    return firebase.auth().signOut();
}