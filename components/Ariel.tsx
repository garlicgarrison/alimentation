import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function Ariel(show)
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
                <span>{
                    storesData.map((doc,index) => {
                    return <span key = {index}>{show && JSON.stringify(storesData)}</span>
                })}
                </span>
            }
            {
                <span>{
                    itemsData.map((doc,index) => {
                    return <span key = {index}>{show && JSON.stringify(itemsData)}</span>
                })}
                </span>
            }
            </div>
        </>
    )
}