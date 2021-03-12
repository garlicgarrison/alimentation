import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Ariel from "../components/Ariel"
<<<<<<< Updated upstream
import Jonathan from "../components/Jonathan"
import StevenC from '../components/StevenC'
=======
import Sam from '../components/Sam'

import stevenC from './stevenC'
>>>>>>> Stashed changes

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

      <main className={styles.main}>
        Steven Jang
        {
          show &&
          <span>{JSON.stringify(users[0])}</span>
        }
        Steven Chan
        {
          show &&
          <StevenC/>
        }
        Ariel
<<<<<<< Updated upstream
        {
          show &&
          <Ariel/>
        }
        Jonathan 
        {
          show &&
          <Jonathan/>
        }
=======
        <Ariel/>
        SAMMMM
        <Sam/>
>>>>>>> Stashed changes
        <button onClick = {e => setShow(!show)}>toggle</button>
      </main>


      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
