import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"

import Layout from '../components/layouts/Layout'

export default function Login() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation-Log in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.zip_input_container}>
          <h1>Log in</h1>

            <div className={styles.input_area}>
              <input className={styles.field_input} placeholder="Username or E-mail" />
              <input className={styles.field_input} placeholder="Password" />
              <button className={styles.login_button}>
                <p>Log in</p>
              </button>
            </div>

        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Login.getLayout = page => <Layout>{page}</Layout>
