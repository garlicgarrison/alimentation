import React, { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import styles from '../styles/Checkout.module.scss'
import firebase from '../firebase/config'
import Addresses from '../components/checkout/Addresses';

const db = firebase.firestore();

export default function Checkout()
{
    const [shopCart, setShopCart] = useState(null)
    const [userDocRef, setUserDoc] = useState(null)

    useEffect(() => {
        if (firebase.auth().currentUser)
        {
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
                snapshot.forEach(doc => {
                    console.log("customer", doc)
                    doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                        shoppingSnap.forEach(shopDoc => {
                            shopDoc.ref.onSnapshot(shopDocSnap => {
                                setShopCart(shopDocSnap)
                            })
                        })
                    })
                })
            })
        }

    }, [firebase.auth().currentUser])

    return (
        <div className = {styles.container}>
            <Addresses/>
            <div className = {styles.payment_method}>

            </div>

        </div>
    )
}

Checkout.getLayout = page => <Layout>{page}</Layout>

