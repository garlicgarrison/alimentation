import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import React, { useEffect, useState, useRef, MouseEventHandler } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';
import Layout from '../components/layouts/Layout'
import { emailSignup, facebookAuth, googleAuth } from '../service/auth/auth'


const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Signup() {

    const formRef = useRef(null);
    const [loginError, setLoginError] = useState<any>(null);
    const [usernameError, setUsernameError] = useState<any>(null);
    const [passwordError, setPasswordError] = useState<any>(null);

    const formHandler = (event) => {
        const { name, value } = event.target;

        switch (name) {
          case "username":
            setUsernameError(re.test(value) ? null : "Email is not valid");
            break;
          case "password":
            setPasswordError(value.length < 6 ? "Password must be at least 6 characters" : null);
            break;
          default:
            break;
        }
      };
    
    const handleEmailSignup = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let email = formRef.current.username.value
        let pw = formRef.current.password.value
        console.log(email, pw)
        let res = await emailSignup(email, pw);
        console.log("res", res)
        if (res.user)
        {
            //get user info
            //add user data to context provider
        }
        else if (res.message)
        {
            setLoginError(res.message)
        }
    }

    const handleFacebookSignup = async (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let res = await facebookAuth();
        console.log(res)
    }

    const handleGoogleSignup = async (e) => {
        e.preventDefault();
        let res = await googleAuth();
        console.log(res)
    }
    

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.input_container}>
          <h1>Sign up</h1>
          
          <div className={styles.input_area}>
              <form ref = {formRef}>
                <span className = {styles.error_message}>{usernameError}</span>
                <input className={styles.field_input} placeholder="E-mail" name = "username" onChange={formHandler}/>
                <span className = {styles.error_message}>{passwordError}</span>
                <input className={styles.field_input} placeholder="Password" name = "password" type = "password" onChange={formHandler}/>
                <button className={styles.login_button} onClick={handleEmailSignup} disabled={usernameError || passwordError}>
                    Sign up
                </button>
              </form>
              <span className = {styles.error_message}>{loginError}</span>
          </div>

          <button onClick = {handleFacebookSignup}>Sign up with Facebook</button>
          <button onClick = {handleGoogleSignup}>Sign up with Google</button>

          <div className={styles.login_issue}>
            <div className={styles.issues}>
              <p>Already have an account?</p>
              <div className={styles.issue_link}>
                <Link href={{pathname: "/login"}}>Login here</Link>
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
