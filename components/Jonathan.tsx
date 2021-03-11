import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function()
{
    const [driver, setDriver] = useState([])

    useEffect(() => {
       firebase.firestore().collectionGroup("driver").get()
       .then(snapshot => {
        snapshot.forEach(Doc => {
            setDriver([...driver, Doc.data()])
            })
        })
    }, [])

return (
    <div>
    {"driver"}
    {<span> {JSON.stringify(driver)} </span>}
    </div>)
}