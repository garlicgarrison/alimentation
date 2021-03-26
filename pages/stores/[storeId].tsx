import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Stores from '.';
import ItemCard from '../../components/cards/ItemCard';
import Layout from '../../components/layouts/Layout';
import firebase from '../../firebase/config'
import styles from '../../styles/StoreView.module.scss'
import Image from 'next/image'

export default function Store()
{
    const router = useRouter();
    const {storeId} = router.query;

    const [storeData, setStoreData] = useState(null)
    const [items, setItems] = useState([])
    const [imageurl, setimageurl] = useState(null)
    
    const storage = firebase.storage();

    useEffect(()=>{
        //@ts-ignore
        firebase.firestore().collection("stores").doc(storeId).get().then(doc => {
            console.log(doc)
            setStoreData(doc.data())
            storage.ref(`stores/${doc.data().image_url}`).getDownloadURL().then(url => {
                setimageurl(url)
            })
            //@ts-ignore
            firebase.firestore().collection("stores").doc(storeId).collection("items").get().then(snapshot => {
                let tempItems = []
                snapshot.forEach(doc => {
                    tempItems.push(doc)
                })
                setItems(tempItems)
                console.log(tempItems)
            })
        })
    }, [])

    return (
        <>
            {
                storeData && 
                <main className = {styles.main_container}>
                    <div className = {styles.header_container}>
                        <img src ={imageurl} className = {styles.store_image}/>
                        
                        <h1 className = {styles.store_header}>
                            {storeData.name}
                        </h1>
                    </div>
                    <div className={styles.item_grids}>
                        {
                            items.map((item, i) => {
                                return <ItemCard itemDoc={item} key={"item"+i}/>
                            })
                        }
                    </div>
                </main>
            }
        </>
    )
}

Store.getLayout = page => <Layout>{page}</Layout>