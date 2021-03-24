import Head from 'next/head'
import styles from '../styles/UserInfo.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';

import Layout from '../components/layouts/Layout'

export default function UserInfo() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation-Log in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.input_container}>
          <div className={styles.input_title}>
            <h1>Sign up</h1>
            <p>Fill in the form to create your account</p>
          </div>
          
          <div className={styles.input_area}>
            <div className={styles.section}>
              <p>Name</p>
              <div className={styles.three_in_row}>
                <input className={styles.row_input} placeholder="First name" />
                <input className={styles.row_input} placeholder="Middle name" />
                <input className={styles.row_input} placeholder="Last name" />
              </div>
            </div>
            
            <div className={styles.section}>
              <p>Phone Number</p>
              <input className={styles.field_input} placeholder="Phone number" />
            </div>

            <div className={styles.section}>
              <p>Address</p>
              <input className={styles.field_input} placeholder="Street 1" />
              <input className={styles.field_input} placeholder="Street 2" />
              <div className={styles.three_in_row}>
                <input className={styles.row_input} placeholder="City" />
                <input className={styles.row_input} placeholder="State" />
                <input className={styles.row_input} placeholder="Zip code" />
              </div>
            </div>
            
            
            <button className={styles.submit_button}>
              <p>Sign Up</p>
            </button>
          </div>

        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

UserInfo.getLayout = page => <Layout>{page}</Layout>
