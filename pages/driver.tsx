import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Driver.module.scss'
import firebase from '../firebase/config'
import "firebase/firestore"
import { Context } from '../components/state/ContextProvider';

const db = firebase.firestore();

export default function Driver() {


    const { authState, setauthState } = useContext(Context)

    const [userDocRef, setUserDocRef] = useState(null)
    const [onCall, setOnCall] = useState(false)
    const [currentTransaction, setCurrentTransaction] = useState(null)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        if (authState.user) {
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("driver").get().then(docRef => {
                docRef.forEach(driver => {
                    setUserDocRef(driver);
                    setOnCall(driver.data().on_call);
                })
            })


        }

        /*
        db.collection("transactions").where("delivery_notes", "==", "hello").get().then(snapshot => {
            
            
        })
        */
       db.collection("transactions").where("driver_id", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
           let temp = []
           snapshot.docs.forEach(trans => {
               temp.push(trans.data())
           })
           setCurrentTransaction(temp[0])
       })

        db.collection("transactions").where("transaction_state", "==", "paid").onSnapshot(snapshot => {
            let tempTrans = []
            snapshot.docs.forEach(trans => {
                tempTrans.push(trans)
            })
            setTransactions(tempTrans)
        })

    }, [authState.user])

    const handleContinue = async (e) => {
        setOnCall(true)
    }

    const acceptTransaction = (e, tran) => {
        e.preventDefault();
        db.collection("transactions").doc(tran.id).update({
            driver_id: firebase.auth().currentUser.uid,
            transaction_state: "accepted"
        })
    }
    
    const finishTransaction = (e, tran) => {
        e.preventDefault();
        db.collection("transactions").doc(tran.id).update({
            driver_id: firebase.auth().currentUser.uid,
            transaction_state: "finished"
        })
    }

    const getTransaction = (tran) => {
        return (
            <div className={styles.delivery_info_container}>
            <div className={styles.address_container}>
                <span>
                    {tran.data().delivery_address.street1}
                </span>
                <span>
                    {tran.data().delivery_address.street2}
                </span>
                <span>
                    {tran.data().delivery_address.city}, {tran.data().delivery_address.state}
                </span>
                <div className={styles.item_quant}>
                    {tran.data().items.length} items
                </div>
            </div>
            </div>)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Alimentation - Driver</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.main}>

                <div className={styles.main_container}>
                    {
                        <h1>
                            Available Orders
                        </h1> 
                        && currentTransaction === null
                    }
                    {
                        transactions.length && currentTransaction === null &&
                        transactions.map((tran, index) => {
                            return (
                                <div className={styles.delivery_info_container}>
                                    getTransaction(tran)
                                    <button onClick={e => acceptTransaction(e, tran)}>
                                        Accept Transaction
                                    </button>
                                </div>
                            )
                        })
                    }
                    {
                        <h1>
                            Current Order
                        </h1> 
                        && currentTransaction != null
                    }
                    {
                        currentTransaction != null &&
                        currentTransaction.map((tran, index) => {
                            return (
                                <div className={styles.delivery_info_container}>
                                    getTransaction(tran)
                                    <button onClick={e => finishTransaction(e, tran)}>
                                        Finish Transaction
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>


            </div>

        </div>
    )
}

Driver.getLayout = page => <Layout>{page}</Layout>