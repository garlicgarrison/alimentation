import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layouts/Layout';
import styles from '../styles/Checkout.module.scss'
import firebase from '../firebase/config'
import "firebase/auth"
import Addresses from '../components/checkout/Addresses';
import Payment from '../components/checkout/Payment';
import ReviewItems from '../components/checkout/ReviewItems';
import { Context } from '../components/state/ContextProvider';
import { useRouter } from 'next/router'

const db = firebase.firestore();

export default function Checkout() {
    const { authState, setauthState } = useContext(Context)
    const [shopItems, setShopItems] = useState(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (authState.user) {
            console.log(db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer"))
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
                snapshot.forEach(doc => {
                    doc.ref.collection("shopping_cart").get().then(shopitemSnap => {
                        shopitemSnap.forEach(itemsDoc => {
                            itemsDoc.ref.onSnapshot(itemsDocSnap => {
                                setShopItems(itemsDocSnap)
                                console.log(itemsDoc)
                            })
                        })
                    })
                })
            })
        }

    }, [authState.user])

    const handleCheckout = async () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        let body = {
            data: {
                customer_id: firebase.auth().currentUser.uid
            }
        }
        setLoading(true)
        await fetch("https://us-central1-alimentation-851c0.cloudfunctions.net/createTransaction",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            }
        )
        router.push("/orders")
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.steps}>
                <Addresses />
                <Payment />
                <ReviewItems />
                <div className={styles.totalAmt_container}>
                    <h1>4. Order Summary</h1>
                    <div className={styles.amt_content}>
                        <div className={styles.amtTitle}>
                            <span>Delivery Fee:</span>
                            <span>Tax:</span>
                            <span>Total Cost:</span>
                        </div>
                        {
                            shopItems &&
                            <div className={styles.amount}>
                                <span>${shopItems.data().delivery.toFixed(2)}</span>
                                <span>${shopItems.data().tax.toFixed(2)}</span>
                                <span>${shopItems.data().total_cost.toFixed(2)}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className = {styles.select_driver_container}>
                    <button className = {styles.order_button} onClick={handleCheckout} disabled={loading}>
                        {
                            loading &&
                            "Processing..."
                        }
                        {
                            !loading && 
                            "Order"
                        }
                    </button>
                </div>
            </div>




        </div>
    )
}

Checkout.getLayout = page => <Layout>{page}</Layout>

