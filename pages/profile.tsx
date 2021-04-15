import Head from 'next/head'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Profile.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Context } from '../components/state/ContextProvider';
import firebase from '../firebase/config'
import "firebase/firestore"
import Link from 'next/link';
import { getHeapSnapshot } from 'node:v8';


export default function Profile() {

  const { authState, setauthState } = useContext(Context)
  const db = firebase.firestore();

  const [userDocRef, setUserDocRef] = useState(null)
  const [editOn, setEditOn] = useState(false)

  useEffect(() => {
    console.log("Load User Data...", firebase.auth().currentUser)
    if (authState.user) {

      //@ts-ignore
      db.collection("users").doc(firebase.auth().currentUser.uid).get().then(docRef => {
        setUserDocRef(docRef)
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
                  <h4>
                    Name
                  </h4>
                  <div className={styles.section_info}>
                    {
                      userDocRef && !editOn &&
                      <div>
                        <span>{userDocRef.data().name.first} {userDocRef.data().name.middle} {userDocRef.data().name.last}</span>
                      </div>
                    }
                    {
                      userDocRef && editOn &&
                      <div>
                        <input defaultValue = {userDocRef.data().name.first} className = {styles.input_area} placeholder = "First Name"/>
                        <input defaultValue = {userDocRef.data().name.middle} className = {styles.input_area} placeholder = "Middle Name"/>
                        <input defaultValue = {userDocRef.data().name.last} className = {styles.input_area} placeholder = "Last Name"/>
                      </div>
                    }
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
                    {
                      userDocRef && !editOn &&
                      userDocRef.data().phone_number
                    }
                    {
                      userDocRef && editOn &&
                      <div>
                        <input defaultValue = {userDocRef.data().phone_number} className = {styles.input_area} placeholder = "Phone Number"/>
                      </div>
                    }
                  </div>
                </div>

                <div className={styles.section}>
                  <h4>Address </h4>
                  <div className={styles.address_container}>
                    <span className={styles.street}>
                      {
                        userDocRef && !editOn &&
                        userDocRef.data().main_address.street1
                      }
                      {
                        userDocRef && editOn &&
                        <div>
                          <input defaultValue = {userDocRef.data().main_address.street1} className = {styles.input_area} placeholder = "Street 1"/>
                        </div>
                      }
                    </span>
                    
                    <span className={styles.street}>
                      {
                        userDocRef && !editOn &&
                        userDocRef.data().main_address.street2
                      }
                      {
                        userDocRef && editOn &&
                        <div>
                          <input defaultValue = {userDocRef.data().main_address.street2} className = {styles.input_area} placeholder = "Street 2"/>
                        </div>
                      }
                    </span>
                    <div className = {styles.city_state}>
                      <span  className={styles.city}>
                        {
                          userDocRef && !editOn &&
                          userDocRef.data().main_address.city
                        }
                        {
                          userDocRef && editOn &&
                          <div>
                            <input defaultValue = {userDocRef.data().main_address.city} className = {styles.input_area} placeholder = "City"/>
                          </div>
                        }
                      </span>
                      <span className={styles.state}>
                        {
                          userDocRef && !editOn &&
                          userDocRef.data().main_address.state
                        }
                        {
                          userDocRef && editOn &&
                          <div>
                            <input defaultValue = {userDocRef.data().main_address.state} className = {styles.input_area} placeholder = "State"/>
                          </div>
                        }
                      </span>
                    </div>
                    <span className={styles.zip}>
                      {
                        userDocRef && !editOn &&
                        userDocRef.data().main_address.zip
                      }
                      {
                        userDocRef && editOn &&
                        <div>
                          <input defaultValue = {userDocRef.data().main_address.zip} className = {styles.input_area} placeholder = "Zip code"/>
                        </div>
                      }
                    </span>
                  </div>
                </div>


                <button className={styles.submit_button} disabled = {userDocRef === null} onClick = {() => setEditOn(true)}>
                    Edit Profile
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
