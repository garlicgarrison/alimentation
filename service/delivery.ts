import firebase from '../firebase/config'

export function createDriver() {
    
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("driver").doc(firebase.auth().currentUser.uid).get().then(docRef => {
        docRef.ref.set({
            driver_id: docRef.id,
            on_call: false,
            current_transaction: null
        })

        docRef.ref.collection("reviews").doc().get().then(docRef => {
            docRef.ref.set({
                review_id: docRef.id,
                reviews: [],
                rating: 0
            })
        })
    })
}

