import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function Jonathan()
{
    const [driver, setDriver] = useState([])
    const [customer, setCustomer] = useState([])

    useEffect(() => {
       firebase.firestore().collectionGroup("driver").get()
       .then(snapshot => {
        snapshot.forEach(Doc => {
            setDriver([...driver, Doc.data()])
            })
        })
    }, [])

    useEffect(() => {
        firebase.firestore().collectionGroup("customer").get()
        .then(snapshot => {
         snapshot.forEach(Doc => {
             setCustomer([...customer, Doc.data()])
             })
         })
     }, [])

return (
    <div>
    {"driver"}
    {<span> {JSON.stringify(driver)} </span>}
    {"customer"}
    {<span> {JSON.stringify(customer)} </span>}
    </div>)
}