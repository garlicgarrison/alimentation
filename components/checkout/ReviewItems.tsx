import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../state/ContextProvider';
import styles from '../../styles/components/cards/checkout/ReviewItems.module.scss'
import ShopItem from '../cards/ShopItem';
import firebase from '../../firebase/config'
import "firebase/auth"


const db = firebase.firestore();

export default function ReviewItems()
{
    const [shopItems, setShopItems] = useState(null)
    const { authState, setauthState } = useContext(Context)
    const [ editOn, setEditOn ] = useState(false)

    useEffect(() => {
        if(authState.user)
        {
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
                snapshot.forEach(doc =>{
                    doc.ref.collection("shopping_cart").get().then(shopitemSnap => {
                        shopitemSnap.forEach(itemsDoc =>{
                            itemsDoc.ref.onSnapshot(itemsDocSnap =>{
                                setShopItems(itemsDocSnap)
                            })
                        })
                    })
                })
            })
        }

    }, [authState.user]) 

    const deleteShopItem = (index) => {
        let tempArray = shopItems.data().items;
        tempArray.splice(index, 1)
        shopItems.ref.update({
                items: tempArray
        })
    }

    return (
        <div className = {styles.reviewitems_container}>
            <h1>3. Review Items</h1>
            <div className = {styles.reviewitems_whole}>
            {
                shopItems &&
                <div className = {styles.reviewitems_section}>
                    {
                        shopItems.data().items.map((item, index) => {
                            console.log(item.image_url)
                            return (
                                <div className = {styles.shop_item}>
                                    <ShopItem item = {item} index = {index} deleteItem={deleteShopItem}/>
                                    {
                                        index !== shopItems.data().items.length - 1 &&
                                        <hr style={{opacity: "20%"}}/>
                                    }
                                </div>
                            )
                        })
                    
                    }
                </div>
                
            }
            </div>
        </div>
    )
}