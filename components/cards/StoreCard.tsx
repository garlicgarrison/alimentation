import React, { useContext, useEffect, useState } from 'react';
import styles from '../../styles/components/cards/StoreCard.module.scss'
import firebase from 'firebase/app'
import "@firebase/storage"
import { useRouter } from 'next/router';
import { Context } from '../state/ContextProvider';

export default function StoreCard({ storeDoc = null }) {
    const { authState, setAuthState } = useContext(Context)
    const store = storeDoc.data();
    const [imageurl, setimageurl] = useState<string>("")
    const storage = firebase.storage();
    const [distance, setDistance] = useState(null)

    const router = useRouter();

    console.log(store)

    useEffect(() => {
        storage.ref(`stores/${store.image_url}`).getDownloadURL().then(url => {
            setimageurl(url)
        })
    }, [])

    useEffect(() => {
        if (firebase.auth().currentUser) {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(async docRef => {
                let userAddy = docRef.data().main_address;
                if (!userAddy) {
                    return;
                }
                let formattedUser = encodeURIComponent(userAddy.street1 + " " + userAddy.city + " " + userAddy.state)
                let formattedStore = encodeURIComponent(store.address.address1 + " " + store.address.city + " " + store.address.state)
                let headers = new Headers();
                headers.append('Content-Type', 'application/json')
                let body = {
                    data: {
                        user_address: formattedUser,
                        store_address: formattedStore
                    }
                }
                let res = await fetch("https://us-central1-alimentation-851c0.cloudfunctions.net/getDistance",
                    {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(body)
                    }
                )
                let resData = await res.json();
                console.log(resData)
                setDistance(resData.result)
            })
        }
    }, [authState.user])

    const handleStoreClick = (e) => {
        router.push(`/stores/${storeDoc.id}`)
    }

    return (
        <div className={styles.store_card_container} onClick={handleStoreClick}>
            <img src={imageurl} className={styles.store_image} />

            <div className={styles.mid_container}>
                <h2>{store.name}</h2>
                <span>{store.address.address1}, {store.address.city}</span>
                <span className = {styles.distance_calc} style={{ display: "block" }}>{distance}</span>
            </div>
        </div>
    )
}