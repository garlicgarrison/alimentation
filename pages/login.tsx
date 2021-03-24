import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';

import Layout from '../components/layouts/Layout'

const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function Login() {

  const formRef = useRef(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const formHandler = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "username":
        setUsernameError(re.test(value) ? "" : "Email is not valid");
        break;
      case "password":
        setPasswordError(value.length < 6 ? "Password must be at least 6 characters" : "");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login to Alimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.input_container}>
          <h1>Log in</h1>

          <div className={styles.input_area}>
            <form ref = {formRef}>
              <span className = {styles.error_message}>{usernameError}</span>
              <input className={styles.field_input} placeholder="E-mail" name = "username" onChange={formHandler}/>
              <span className = {styles.error_message}>{passwordError}</span>
              <input className={styles.field_input} placeholder="Password" name = "password" type = "password" onChange={formHandler}/>
              <button className={styles.login_button}>
                <p>Log in</p>
              </button>
            </form>
          </div>

          <div className={styles.login_issue}>
            <div className={styles.issues}>
              <p>Don't have an account?</p>
              <div className={styles.issue_link}>
                <Link href={{pathname: "/signup"}}>Sign up here</Link>
              </div>
              
            </div>
            <div className={styles.issues}>
              <p>Forgot your password?</p>
              <div className={styles.issue_link}>
                <Link href={{pathname: "/"}}>Reset it here</Link>
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

Login.getLayout = page => <Layout>{page}</Layout>
