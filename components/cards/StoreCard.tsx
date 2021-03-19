import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/cards/StoreCard.module.scss'
import firebase from 'firebase/app'
import "@firebase/storage"

export default function StoreCard({store = null})
{
    const [imageurl, setimageurl] = useState<string>("")
    const storage = firebase.storage();

    console.log(store.image_url)

    useEffect(() => {
        storage.ref(`stores/${store.image_url}`).getDownloadURL().then(url => {
            setimageurl(url)
        })
    }, [])
    return (
        <div className={styles.store_card_container}>
            <img src = {imageurl} className = {styles.store_image}/>

            <div className = {styles.mid_container}>
                <h2>{store.name}</h2>
                <span>{store.address.address1}, {store.address.city}</span>
            </div>
        </div>
    )
}