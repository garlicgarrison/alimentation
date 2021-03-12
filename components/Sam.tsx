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
        db.collection("transaction").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
                setTransactions([...transaction, doc.data()])
            })
        })
    }, [])

    return (
        <div>
            {JSON.stringify(transaction)}
            {JSON.stringify(publicProfiles)}
        </div>
    )
}

export default Sam;
