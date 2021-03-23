import Head from 'next/head'
import styles from '../styles/Signup.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';

import Layout from '../components/layouts/Layout'

export default function Signup() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation-Log in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.input_container}>
          <h1>Sign up</h1>
          
          <div className={styles.input_area}>
            <div>
              <input className={styles.field_input} placeholder="E-mail" />
              <input className={styles.field_input} placeholder="Password" />
              <input className={styles.field_input} placeholder="Confirm password" />
            </div>
                     
            <Link href={{pathname: '/userInfo'}}>
              <button className={styles.submit_button}>
                {/*Navigate to userinfo*/}
                <p>Create an account</p>
              </button>
            </Link>

            <div className={styles.signup_issue}>
              <div className={styles.issues}>
                <p>Already have an account?</p>
                <div className={styles.issue_link}>
                  <Link href={{pathname: "/login"}}>Log in here</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Signup.getLayout = page => <Layout>{page}</Layout>
