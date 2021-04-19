import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config'
import styles from '../../styles/components/cards/checkout/Payment.module.scss'
import { Context } from '../state/ContextProvider';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';

const db = firebase.firestore();

export default function Payment()
{
    const [error, setError] = useState(null)
    const [editOn, setEditOn] = useState(false)
    const [userDocRef, setUserDoc] = useState(null)
    const [payment, setPayment] = useState({
        cvc: "",
        expiry: "",
        nameOnCard: "",
        number: ""
    })
    const {authState, setAuthState} = useContext(Context)

    useEffect(() => {
        if (authState.user) {
            db.collection("users").doc(authState.user.uid).onSnapshot(docRef => {
                setUserDoc(docRef)
            })
        }
    }, [authState])

    useEffect(() => {
        if (userDocRef && userDocRef.data().creidt_card) {
            setPayment(userDocRef.data().credit_card)
        }
        else if (userDocRef && userDocRef.data().credit_card !== null)
        {
            db.collection("users").doc
        }
    }, [userDocRef])

    const changeAddress = () => {
        console.log(payment)
        if (
            payment.cvc !== "" &&
            payment.expiry !== "" &&
            payment.nameOnCard !== "" &&
            payment.number !== ""
        ) {

            db.collection("users").doc(firebase.auth().currentUser.uid).set({
                credit_card: payment
            }, { merge: true }).then((result) => {
                console.log("result", result)
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then(userRef => {
                    setPayment(userRef.data().credit_card)
                }).then(() => {
                    setEditOn(false)
                    setError(null)
                })
            })
        }
        else {
            setError("Fill in all required fields")
        }
    }

    const discardChanges = () => {
        setPayment(
            userDocRef.data().credit_card
        )
        setEditOn(false)
        setError(null)
    }

    const handlePaymentChange = (event) => {
        const { name, value } = event.target;
        let tempPayment = payment;
        switch (name) {
            case "cvc":
                tempPayment.cvc = value;
                break;
            case "expiry":
                tempPayment.expiry = value;
                break;
            case "nameOnCard":
                tempPayment.nameOnCard = value;
                break;
            case "number":
                tempPayment.number = value;
                break;
            default:
                break;
        }
        setPayment(tempPayment)
    }


    return (
        <div className={styles.payment_container}>
            <h1>2. Choose Payment</h1>
            {
                error &&
                <span className = {styles.error}>{error}</span>
            }
            
            <div className={styles.payment_whole}>
            {
                userDocRef && !editOn &&
                <div className = {styles.payment_section}>
                    <span>card ending in xxxx</span> {/*unfinished*/}
                </div>
            }
            {
                userDocRef && !editOn &&
                <button className={styles.change_button} onClick={() => setEditOn(true)}>Change</button>
            }
            </div>
            {
                userDocRef && editOn &&
                    <div className={styles.payment_section_edit}>
                    <Cards
                        cvc = {payment.cvc}
                        expiry = {payment.expiry}
                        name = {payment.nameOnCard}
                        number = {payment.number}
                    />
                    <input defaultValue={userDocRef.data().credit_card.nameOnCard} placeholder="Name on Card" name="nameOnCard" onChange={handlePaymentChange}></input>
                    <input defaultValue={userDocRef.data().credit_card.number} placeholder="Card Number" name="number" onChange={handlePaymentChange}></input>
                    <div>
                        <input defaultValue={userDocRef.data().credit_card.expiry} placeholder="Expiration Date" name="expiry" onChange={handlePaymentChange}></input>
                        <input defaultValue={userDocRef.data().credit_card.cvc} placeholder="Security Code" name="cvc" onChange={handlePaymentChange}></input>
                    </div>
                    <div className = {styles.change_payment_container}>
                        <button className = {styles.discard} onClick = {discardChanges}>
                            Discard
                        </button>
                        <button className = {styles.save} onClick = {changeAddress}>
                            Save
                        </button>
                    </div>
                </div>
            }
           
        </div>
        
    )
}