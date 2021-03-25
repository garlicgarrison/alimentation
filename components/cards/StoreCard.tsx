import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/cards/StoreCard.module.scss'
import firebase from 'firebase/app'
import "@firebase/storage"
import { useRouter } from 'next/router';

export default function StoreCard({storeDoc = null})
{
    const store = storeDoc.data();
    const [imageurl, setimageurl] = useState<string>("")
    const storage = firebase.storage();

    const router = useRouter();

    console.log(store)

    useEffect(() => {
        storage.ref(`stores/${store.image_url}`).getDownloadURL().then(url => {
            setimageurl(url)
        })
    }, [])

    const handleStoreClick = (e) => {
        router.push(`/stores/${storeDoc.id}`)
    }

    return (
        <div className={styles.store_card_container} onClick = {handleStoreClick}>
            <img src = {imageurl} className = {styles.store_image}/>

            <div className = {styles.mid_container}>
                <h2>{store.name}</h2>
                <span>{store.address.address1}, {store.address.city}</span>
            </div>
        </div>
    )
}