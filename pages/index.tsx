import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, {useEffect, useState} from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"

import Layout from '../components/layouts/Layout'

export default function Home() {

  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    firebase.firestore().collection("users").get().then(snapshot => {
      snapshot.forEach(doc => {
        setUsers([...users, doc.data()])
      })
    })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} align-items={styles.left}>
        <div className = {styles.zip_input_container}>
          <h1>Alimentation</h1>
          <div className = {styles.input_area}>
            <input className={styles.address_input}/>
            <button className = {styles.nav_button}/>
          </div>
        </div>
      </main>


      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

Home.getLayout = page => <Layout>{page}</Layout>
