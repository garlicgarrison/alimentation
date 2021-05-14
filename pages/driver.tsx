import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Driver.module.scss'
import firebase from '../firebase/config'
import "firebase/firestore"
import { Context } from '../components/state/ContextProvider';
import ShopItemOrder from '../components/cards/ShopItemOrder'

const db = firebase.firestore();

export default function Driver() {


    const { authState, setauthState } = useContext(Context)

    const [currentTransaction, setCurrentTransaction] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)

    useEffect(() => {

        if (authState.user) {
            setLikes(0);
            setDislikes(0);
            db.collection("transactions")
                .where("driver_id", "==", firebase.auth().currentUser.uid)
                .where("transaction_state", "==", "finished")
                .onSnapshot(snapshot => {
                    let temp = []
                    snapshot.docs.forEach(trans => {
                        if (trans.data().rating === "liked") {
                            setLikes(currentLikes => {
                                return currentLikes + 1
                            })
                        }
                        else if (trans.data().rating === "disliked") {
                            setDislikes(currentDislikes => {
                                return currentDislikes + 1
                            })
                        }
                    })
                })
            db.collection("transactions")
                .where("driver_id", "==", firebase.auth().currentUser.uid)
                .where("transaction_state", "==", "accepted")
                .onSnapshot(snapshot => {
                    let temp = []
                    snapshot.docs.forEach(trans => {
                        temp.push(trans)
                    })
                    setCurrentTransaction(temp.length ? temp[0] : null)
                })

            db.collection("transactions").where("transaction_state", "==", "paid").onSnapshot(snapshot => {
                let tempTrans = []
                snapshot.docs.forEach(trans => {
                    tempTrans.push(trans)
                })
                setTransactions(tempTrans)
            })
        }

    }, [authState.user])

    const acceptTransaction = (e, tran) => {
        e.preventDefault();
        db.collection("transactions").doc(tran.id).update({
            driver_id: firebase.auth().currentUser.uid,
            transaction_state: "accepted"
        })
    }

    const finishTransaction = (e) => {
        db.collection("transactions").doc(currentTransaction.id).update({
            transaction_state: "finished"
        }).catch(err => {
            console.log("err", err)
        })
    }


    const GetTransaction = ({ tran }) => {
        return (
            <div className={styles.delivery_info_container}>
                <div className={styles.address_container}>
                    <span>
                        {tran.delivery_address.street1}
                    </span>
                    <span>
                        {tran.delivery_address.street2}
                    </span>
                    <span>
                        {tran.delivery_address.city}, {tran.delivery_address.state}
                    </span>
                    <div className={styles.item_quant}>
                        {tran.items.length} items
                    </div>
                </div>
            </div>)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Alimentation - Driver</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.main}>



                <div className={styles.main_container}>
                    <div className={styles.rating_container}>
                        <h1>My Rating</h1>
                        <div className={styles.driver_rating_container}>
                            <span>{likes} 👍</span>
                            <div className={styles.rating_bar}>
                                <div
                                    className={styles.like_bar}
                                    style={{ width: likes + dislikes === 0 ? "50%" : `${100 * (likes / (likes + dislikes))}%` }}>

                                </div>
                            </div>
                            <span>{dislikes} 👎</span>
                        </div>
                    </div>

                    {
                        currentTransaction === null &&
                        <h1>
                            Available Orders
                        </h1>
                    }
                    {
                        (transactions.length > 0 && currentTransaction === null) &&
                        <div>
                            {
                                transactions.map((tran, index) => {
                                    return (
                                        <div className={styles.delivery_info_container}>
                                            <GetTransaction tran={tran.data()} />
                                            <button onClick={e => acceptTransaction(e, tran)}>
                                                Accept
                                        </button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    }
                    {
                        currentTransaction &&
                        <h1>
                            Current Order
                        </h1>

                    }
                    {
                        currentTransaction &&
                        <div>
                            {
                                currentTransaction.data().items.map((item, index) => {
                                    return <ShopItemOrder item={item} index={index} />
                                })
                            }
                            <div className={styles.delivery_info_container}>
                                <GetTransaction tran={currentTransaction.data()} />
                                <button onClick={finishTransaction}>
                                    Finish
                                </button>
                            </div>
                        </div>
                    }
                    {
                        transactions.length == 0 &&
                        currentTransaction === null &&
                        <h3>No available Orders</h3>
                    }
                </div>

            </div>

        </div>
    )
}

Driver.getLayout = page => <Layout>{page}</Layout>