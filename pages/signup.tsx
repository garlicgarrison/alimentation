import Head from 'next/head'
import styles from '../styles/Login.module.scss'
import React, { useEffect, useState, useRef, MouseEventHandler } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link  from 'next/link';
import Layout from '../components/layouts/Layout'
import { emailSignup, facebookAuth, googleAuth } from '../service/auth/auth'
import {useRouter} from 'next/router'


const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Signup() {

    const router = useRouter();

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
        
        let res = await emailSignup(email, pw);
        
        if (res.user)
        {
            router.push("/userinfo")
        }
        else if (res.message)
        {
            setLoginError(res.message)
        }
    }


    const handleGoogleSignup = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        let res = await googleAuth();
        console.log(res)
        if (res.user)
        {
            router.push("/userinfo")
        }
        else if (res.message)
        {
            setLoginError(res.message)
        }
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
                    <p>Sign up</p>
                </button>
              </form>
              <span className = {styles.error_message}>{loginError}</span>
          </div>

          <div className={styles.other_options}>
            <button className={styles.signin_options} onClick = {handleGoogleSignup}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 262" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/>
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/>
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/>
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                </svg>
                Sign up with Google
            </button>
          </div>
          
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
