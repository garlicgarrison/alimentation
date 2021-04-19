import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config'
import styles from '../../styles/components/cards/checkout/Addresses.module.scss'
import { Context } from '../state/ContextProvider';
const db = firebase.firestore();


export default function Addresses() {
    const {authState, setAuthState} = useContext(Context)

    const [userDocRef, setUserDoc] = useState(null)
    const [editOn, setEditOn] = useState(false)
    const [address, setAddress] = useState({
        street1: "",
        street2: "",
        city: "",
        state: "",
        zip: ""
    })
    const [error, setError] = useState(null)

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        let tempAddress = address;
        switch (name) {
            case "street1":
                tempAddress.street1 = value;
                break;
            case "street2":
                tempAddress.street2 = value;
                break;
            case "city":
                tempAddress.city = value;
                break;
            case "state":
                tempAddress.state = value;
                break;
            case "zip":
                tempAddress.zip = value;
                break;
            default:
                break;
        }
        setAddress(tempAddress)
    }

    useEffect(() => {
        if (authState.user) {
            db.collection("users").doc(authState.user.uid).onSnapshot(docRef => {
                setUserDoc(docRef)
            })
        }
    }, [authState])

    useEffect(() => {
        if (userDocRef) {
            setAddress(userDocRef.data().main_address)
        }
    }, [userDocRef])

    const changeAddress = () => {
        console.log(address)
        if (
            address.street1 !== "" &&
            address.city !== "" &&
            address.state !== "" &&
            address.zip !== ""
        ) {

            db.collection("users").doc(firebase.auth().currentUser.uid).set({
                main_address: address
            }, { merge: true }).then((result) => {
                console.log("result", result)
                db.collection("users").doc(firebase.auth().currentUser.uid).get().then(userRef => {
                    setAddress(userRef.data().main_address)
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
        setAddress(
            userDocRef.data().main_address
        )
        setEditOn(false)
        setError(null)
    }


    return (
        <div className={styles.address_container}>
            <h1>1. Your Address</h1>
            {
                error &&
                <span className = {styles.error}>{error}</span>
            }
            <div className={styles.address_whole}>
                {
                    userDocRef && !editOn &&
                    <div className={styles.address_section}>
                        <span>{userDocRef.data().main_address.street1}</span>
                        <span>{userDocRef.data().main_address.street2}</span>
                        <span>{userDocRef.data().main_address.city}, {userDocRef.data().main_address.state}</span>
                        <span>{userDocRef.data().main_address.zip}</span>
                    </div>
                }
                {
                    userDocRef && !editOn &&
                    <button className={styles.change_button} onClick={() => setEditOn(true)}>Change</button>
                }
            </div>
            {
                userDocRef && editOn &&
                <div className={styles.address_section_edit}>
                    <input defaultValue={userDocRef.data().main_address.street1} placeholder="Street 1" name="street1" onChange={handleAddressChange}></input>
                    <input defaultValue={userDocRef.data().main_address.street2} placeholder="Street 2" name="street2" onChange={handleAddressChange}></input>
                    <div>
                        <input defaultValue={userDocRef.data().main_address.city} placeholder="City" name="city" onChange={handleAddressChange}></input>
                        <input defaultValue={userDocRef.data().main_address.state} placeholder="State" name="state" onChange={handleAddressChange}></input>
                    </div>
                    <input defaultValue={userDocRef.data().main_address.zip} placeholder="Zip Code" name="zip" onChange={handleAddressChange}></input>
                    <div className = {styles.change_address_container}>
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