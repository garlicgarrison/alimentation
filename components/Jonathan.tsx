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

return (<div>
    <h1>Driver</h1>
    {
        <span>{
            driver.map((doc,index) => {
            return <span key = {index}>{JSON.stringify(driver)}</span>
        })}
        </span>
    }
    <h1>Customer</h1>
    {
        <span>{
            customer.map((doc,index) => {
            return <span key = {index}>{JSON.stringify(customer)}</span>
        })}
        </span>
    }
    </div>)
}