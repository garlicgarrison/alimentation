import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/cards/ShopItem.module.scss'
import firebase from '../../firebase/config'
import "@firebase/storage"
import "firebase/firestore"
import { setShoppingCart } from '../../service/items'


const storage = firebase.storage();

export default function ShopItem({ item, index, deleteItem = null }) {
    const [image, setImage] = useState(null)
    const [quant, setQuant] = useState<number>(item.quantity.amount)

    console.log(item)
    useEffect(() => {
        storage.ref(`items/${item.image_url}`).getDownloadURL().then(url => {
            setImage(url)
        })
    }, [item])

    const handleSelectChange = (e) => {
        if (e.target.value !== quant) {
            setQuant(e.target.value)
            deleteItem(index);
            let tempItem = item;
            tempItem.quantity.amount = e.target.value;
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
                snapshot.forEach(doc => {
                    doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                        shoppingSnap.forEach(shoppingDoc => {
                            shoppingDoc.ref.update({
                                items: firebase.firestore.FieldValue.arrayUnion(
                                    tempItem
                                )

                            })
                        })
                    })
                })
            })
        }
    }

    const Options = () => {
        return (
            <select onChange={handleSelectChange} value={quant}>
                {
                    [...Array(51)].map((e, i) => {
                        return (
                            i > 0 &&
                            <option value={i}>{i}</option>
                        )
                    })
                }
            </select>
        )
    }

    return (
        <div className={styles.item_card_container}>
            <div className={styles.image_container}>
                <img src={image} />
            </div>

            <div className={styles.product_info}>
                <span className={styles.name}>{item.name}</span>
                <div className={styles.trans_details}>
                    <span>Price: ${item.price}</span>
                    <span>Quantity: <Options /></span>
                </div>
            </div>

            {
                deleteItem &&
                <button className={styles.delete_item} onClick={() => deleteItem(index)}>
                    x
                </button>
            }
        </div>
    )
}