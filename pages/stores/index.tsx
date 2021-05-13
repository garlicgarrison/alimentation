import React, {useEffect, useState} from 'react';
import StoreCard from '../../components/cards/StoreCard';
import Layout from '../../components/layouts/Layout';
import styles from '../../styles/Stores.module.scss'
import firebase from '../../firebase/config'
import 'firebase/firestore';


export default function Stores()
{
    const [stores, setStores] = useState([])

    useEffect(()=>{
        firebase.firestore().collection("stores").get().then(snapshot => {
            let tempStore = []
            snapshot.forEach(doc => {
                tempStore = [...tempStore, doc]
            })
            console.log("slava ukraini")
            console.log(tempStore)
            setStores(tempStore)
        })
    }, [])

    return (
        <div className = {styles.main_container}>
            <h2>Stores</h2>
            <div className = {styles.store_grids}>
                {
                    stores.map((store, i) => {
                        return <StoreCard storeDoc={store} key={"store"+i}/>
                    })
                }
            </div>
        </div>
    )
}

Stores.getLayout = page => <Layout>{page}</Layout>