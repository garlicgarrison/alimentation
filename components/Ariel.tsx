import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function Ariel()
{
    const [docData, setDocData] = useState([])

    useEffect(() => {
        firebase.firestore().collection("stores").get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                setDocData([...docData, doc.data()])
            })
        })
    }, [])
    return (
        <>
            <span>{
                docData.map((doc,index) => {
                     return <span key = {index}>{JSON.stringify(doc)}</span>
                })
            }   </span>
        </>
    )
}