import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config'
import "firebase/firestore"


const Sam = () => {
    const [publicProfiles, setPublicProfiles] = useState([])
    const [transaction, setTransactions] = useState([])
    const db = firebase.firestore();

    useEffect(()=>{
       db.collection("users").get().then( (snapshot) => {
            snapshot.forEach(doc => {
                db.collection("users").doc(doc.id).collection("public_profile").get().then (publicsnapshot => {
                    publicsnapshot.forEach(publicDoc => {
                        console.log(publicDoc.data())
                        setPublicProfiles([...publicProfiles, publicDoc.data()])

                    })
                })
            })
        })
    }, [])

    useEffect(() => {  
        db.collection("transactions").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                setTransactions([...transaction, doc.data()])
            })
        })
    }, [])

    return (
        <div>
            <h1>Transaction</h1>
            {JSON.stringify(transaction)}
            <h1>Public Profiles</h1>
            {JSON.stringify(publicProfiles)}
        </div>
    )
}

export default Sam;
