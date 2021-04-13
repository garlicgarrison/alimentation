import Head from 'next/head'
import Layout from '../components/layouts/Layout'
import styles from '../styles/Profile.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';


export default function Profile() {

  return (
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
              <h4>Name</h4>
              <div className={styles.info_name}>

              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.info_email}>
                <h4>E-mail</h4>
              </div>
            </div>
            
            <div className={styles.section}>
              <h4>Phone Number</h4>
              <div className={styles.info_phone_num}>

              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.info_address}>
                <h4>Address </h4>
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
  )
}

Profile.getLayout = page => <Layout>{page}</Layout>
