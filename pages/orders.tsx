import React, { useContext, useEffect, useState } from 'react';
import ShopItem from '../components/cards/ShopItem';
import ShopItemOrder from '../components/cards/ShopItemOrder';
import Layout from '../components/layouts/Layout';
import { Context } from '../components/state/ContextProvider';
import firebase from '../firebase/config'
import styles from '../styles/Orders.module.scss'

const db = firebase.firestore();
export default function Orders() {
    const [orders, setOrders] = useState(null);
    const [rating, setRating] = useState(null)
    const {authState, setAuthState} = useContext(Context)
    useEffect(() => {
        if (firebase.auth().currentUser)
        {
            db.collection("transactions").where("customer_id", "==", firebase.auth().currentUser.uid).get().then(snapshot => {
                let temp = []
                snapshot.docs.forEach(tran => {
                    temp.push(tran)
                })
                temp.sort((x, y) => new Date(y.data().payment_time).getTime() - new Date(x.data().payment_time).getTime())
                setOrders(temp)
            })
        }
    }, [authState.user])


    const handleRating = (e, order) => {
        const name = e.target.name
        var newRating;
        if (rating != null && rating == name) {
            newRating = null
        } else {
            newRating = name === "liked" ? "liked" : "disliked"
        }
        db.collection("transactions").doc(order.id).update({
            rating: newRating
        })
        console.log(rating)
    }

    return (
        <div className={styles.main}>
            <div className={styles.main_container}>
                <h1>
                    My Orders
                </h1>
                {
                    orders &&
                    orders.map((order, i) => {
                        return (
                            <div>
                                <h3>
                                    {i+1}.
                                </h3>
                                {
                                    order.data().items.map((item, i) => {
                                        return (
                                            <ShopItemOrder item = {item} index = {i}/>
                                        )
                                    })
                                }
                                <span className = {styles.total_price}>
                                    Order status: {order.data().transaction_state}
                                </span>
                                <span className = {styles.total_price}>
                                    Total price: {order.data().total_cost.toFixed(2)}
                                </span>

                                {
                                    order.data().transaction_state === "finished" &&
                                    <div className = {styles.rating_container}>
                                        <button id = "liked"
                                        className = {styles.like} 
                                        style={{backgroundColor: order.data().rating === "liked" ? "#8CB401" : "white"}}
                                        onClick = {e => handleRating(e, order)}
                                        name="liked"
                                        >
                                            👍 
                                        </button>
                                        <button id = "disliked"
                                        className = {styles.dislike} 
                                        style = {{backgroundColor: order.data().rating === "disliked" ? "#E9692C" : "white"}}
                                        onClick = {e => handleRating(e, order)}
                                        name="disliked"
                                        >
                                            👎 
                                        </button>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

Orders.getLayout = page => <Layout>{page}</Layout>