import React, {useEffect, useState} from 'react';
import styles from '../../styles/components/cards/ShopItem.module.scss'
import firebase from '../../firebase/config'
import "@firebase/storage"


const storage = firebase.storage();

export default function ShopItem({item, index, deleteItem})
{
    const [image, setImage] = useState(null)
    console.log(item)
    useEffect(() => {
        storage.ref(`items/${item.image_url}`).getDownloadURL().then(url => {
            setImage(url)
        })
    }, [item])
    return (
        <div className={styles.item_card_container}>
            <div className = {styles.image_container}>
                <img src={image}/>
            </div>

            <div className = {styles.product_info}>
                <span className = {styles.name}>{item.name}</span>
                <div className = {styles.trans_details}>
                    <span>Price: ${item.price}</span>
                    <span>Quantity: {item.quantity.amount}</span>
                </div>
            </div>

            <button className = {styles.delete_item} onClick = {() => deleteItem(index)}>
                x
            </button>
        </div>
    )
}