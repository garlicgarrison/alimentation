import Head from 'next/head'
import React, { useState , useEffect, useContext } from 'react'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Driver.module.scss'
import firebase from '../firebase/config'
import "firebase/firestore"
import { Context } from '../components/state/ContextProvider';

const db = firebase.firestore();

export default function Driver() {

    
    const { authState, setauthState } = useContext(Context)
    
    const [ userDocRef, setUserDocRef ] = useState(null)
    const [ onCall, setOnCall ] = useState(false)
    const [ currentTransaction, setCurrentTransaction ] = useState(null)
    const [ transactions, setTransactions ] = useState([])

    useEffect (() => {

        if(authState.user) {
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("driver").get().then(docRef => {
                docRef.forEach(driver => {
                    setUserDocRef(driver);
                    setOnCall(driver.data().on_call);
                })
            })


        }
        
        db.collection("transactions").where("transaction_state", "==", "paid").get().then(snapshot => {
            let tempTransac = []
            console.log("snapshot", snapshot)
        })

        db.collection("transactions").where("driver_id", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
            let tempTransac = []
            console.log("snapshot", snapshot)
        })
        
    }, [authState.user])

    const handleContinue = async (e) => {
        setOnCall(true)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Alimentation - Driver</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className={styles.main}>

                <div className = {styles.main_container}>
                    {
                        userDocRef &&
                        <div>
                            {
                                
                            }
                            <button onClick = {handleContinue}>
                                
                            </button>
                        </div>
                    }
                </div>
                
                

            </div>
        

        </div>
    )
}

Driver.getLayout = page => <Layout>{page}</Layout>