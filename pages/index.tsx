import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Ariel from "../components/Ariel"
import Jonathan from "../components/Jonathan"
import StevenC from '../components/stevenC'
import Sam from '../components/Sam'

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} align-items={styles.left}>
        {
          show &&
          <span>
            <h1>Users</h1>{JSON.stringify(users[0])}
            <StevenC/>
            <Ariel/>
            <Jonathan/>
            <Sam/>
          </span>
        }
        <button onClick = {e => setShow(!show)}>toggle</button>
      </main>


      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
