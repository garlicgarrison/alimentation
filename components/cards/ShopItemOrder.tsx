import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/cards/ShopItem.module.scss'
import firebase from '../../firebase/config'
import "@firebase/storage"
import "firebase/firestore"


const storage = firebase.storage();

export default function ShopItemOrder({ item, index}) {
    const [image, setImage] = useState(null)

    useEffect(() => {
        storage.ref(`items/${item.image_url}`).getDownloadURL().then(url => {
            setImage(url)
        })
    }, [item])


    return (
        <div className={styles.item_card_container}>
            <div className={styles.image_container}>
                <img src={image} />
            </div>

            <div className={styles.product_info_order}>
                <span className={styles.name_order}>{item.name}</span>
                <div className={styles.trans_details_order}>
                    <span>Price: ${item.price}</span>
                    <span>Quantity: {item.quantity.amount}</span>
                </div>
            </div>


        </div>
    )
}