import Head from 'next/head'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Profile.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Context } from '../components/state/ContextProvider';
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';
import { getHeapSnapshot } from 'node:v8';


export default function Profile() {

  const { authState, setauthState } = useContext(Context)
  const [userData, setUserData] = useState(null)
  const [imageurl, setimageurl] = useState(null)

  const { userId } = useRouter().query;
  const storage = firebase.storage();
  const db = firebase.firestore();
  
  useEffect(() => {
    console.log("Load User Data...",firebase.auth().currentUser)
    if (authState.user){
      
      //@ts-ignore
      db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot =>{
        snapshot.forEach(doc => {
          console.log("user", doc)
        })
    })
  }
  
  }, [authState.user])

  return (
    <>
      {
        authState.loggedIn &&
        <div className={styles.container}>
        <Head>
          <title>Alimentation-My Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <div className={styles.main_container}>
            <div className={styles.input_title}>
              <h1>Profile</h1>
            </div>
            
            <div className={styles.content}>
              <div className={styles.section}>
                <img src={authState.user.photoURL} className={styles.profile_pic} />
              </div>
              <div className={styles.section}>
                <h4>Name</h4>
                <div className={styles.section_info}>
                  {authState.user.displayName}
                </div>
              </div>
  
              <div className={styles.section}>
                <h4>E-mail</h4>
                <div className={styles.section_info}>
                  {authState.user.email}
                </div>
              </div>
              
              <div className={styles.section}>
                <h4>Phone Number</h4>
                <div className={styles.section_info}>
                  {authState.user.phone_number}
                </div>
              </div>
  
              <div className={styles.section}>
                <h4>Address </h4>
                <div className={styles.section_info}>
                  <p>Street 1</p>
                  <p>Street 2</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Zip Code</p>
                </div>
              </div>
              
              
              <button className={styles.submit_button}>
                <p>Edit Profile</p>
              </button>
            </div>
  
          </div>
        </main>
  
  
        <footer className={styles.footer}>
  
        </footer>
      </div>
      }
    
    </>
  )
}

Profile.getLayout = page => <Layout>{page}</Layout>
