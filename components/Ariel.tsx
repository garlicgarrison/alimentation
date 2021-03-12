import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function Ariel()
{
    const [storesData, setStores] = useState([])
    const [itemsData, setItems] = useState([])

    useEffect(() => {
        firebase.firestore().collection("stores").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                setStores([...storesData, doc.data()])
            })
        })
    }, [])
    useEffect(() => {
        firebase.firestore().collectionGroup("items").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                setItems([...itemsData, doc.data()])
                console.log(doc.data())
            })
        })
    }, [])
    return (
        <>
            <div>
            {
                <h1>Store</h1>
            }
            {
                <span>{
                    storesData.map((doc,index) => {
                    return <span key = {index}>{JSON.stringify(storesData)}</span>
                })}
                </span>
            }
            {
                <h1>Item</h1>
            }
            {
                <span>{
                    itemsData.map((doc,index) => {
                    return <span key = {index}>{JSON.stringify(itemsData)}</span>
                })}
                </span>
            }
            </div>
        </>
    )
}