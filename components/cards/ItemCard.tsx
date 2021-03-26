import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/cards/ItemCard.module.scss'
import firebase from 'firebase/app'
import "@firebase/storage"

export default function ItemCard({itemDoc = null})
{
    const item = itemDoc.data();
    const [imageurl, setimageurl] = useState<string>("")
    const storage = firebase.storage();

    console.log(item.images_preview_url)

    useEffect(() => {
        storage.ref(`items/${item.images_preview_url}`).getDownloadURL().then(url => {
            setimageurl(url)
        })
    }, [])

    return (
        <div className={styles.item_card_container}>
            <div className={styles.item_img_container}>
            <img src = {imageurl} className = {styles.item_image}/>
            </div>

            <div className = {styles.bottom_container}>
                <h4>{item.name}</h4>
                <span>${item.price}</span>
            </div>
        </div>
    )
}