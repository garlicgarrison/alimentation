import Head from 'next/head'
import styles from '../styles/UserInfo.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link from 'next/link';

import Layout from '../components/layouts/Layout'
import { Z_STREAM_ERROR } from 'node:zlib'

export default function UserInfo() {

  const formRef = useRef(null)
  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: ""
  })

  const [userName, setName] = useState({
    fname: "",
    mname: "",
    lname: ""
  })

  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const isComplete = () : boolean => {
    return !(address.street1 === "" 
    || address.city === "" 
    || address.state === "" 
    || address.zip === ""
    || userName.fname === ""
    || userName.lname === ""
    || phone === "")
  }

  const handleForm = (event) => {
    const { value, name } = event.target;
    console.log(value)
    let tempName = userName;
    let tempAdd = address;
    switch (name) {
      case "fname":
        tempName.fname = value;
        setName(Object.assign(tempName))
        break;
      case "lname":
        tempName.lname = value;
        setName(Object.assign(tempName))
        break;
      case "lname":
        tempName.mname = value;
        setName(Object.assign(tempName))
        break;
      case "number":
        setPhone(value);
        break;
      case "street1":
        tempAdd.street1 = value;
        setAddress(Object.assign(tempAdd))
        break;
      case "street2":
        tempAdd.street2 = value;
        setAddress(Object.assign(tempAdd))
        break;
      case "city":
        tempAdd.city = value;
        setAddress(Object.assign(tempAdd))
        break;
      case "state":
        tempAdd.state = value;
        setAddress(Object.assign(tempAdd))
        break;
      case "zip":
        tempAdd.zip = value;
        setAddress(Object.assign(tempAdd))
        break;
      default: 
        break;
    }

  }

  const handleContinue = (e) => {

    if (!isComplete())
    {
      console.log("hety")
      setError("Please fill in all fields (middle name and street 2 are optional)")
      return;
    }

  }

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
            <span className = {styles.error}>{error}</span>
          </div>
          <div className={styles.input_area} ref = {formRef}>
            <div className={styles.section}>
              <p>Name</p>
              <div className={styles.three_in_row}>
                <input className={styles.row_input} placeholder="First name" name="fname" onChange={handleForm} />
                <input className={styles.row_input} placeholder="Middle name" name="mname" onChange={handleForm} />
                <input className={styles.row_input} placeholder="Last name" name="lname" onChange={handleForm} />
              </div>
            </div>

            <div className={styles.section}>
              <p>Phone Number*</p>
              <input className={styles.field_input} placeholder="Phone number" name="number" onChange={handleForm} />
            </div>

            <div className={styles.section}>
              <p>Address</p>
              <input className={styles.field_input} placeholder="Street 1" name="street1" onChange={handleForm} />
              <input className={styles.field_input} placeholder="Street 2" name="street2" onChange={handleForm} />
              <div className={styles.three_in_row}>
                <input className={styles.row_input} placeholder="City" name="city" onChange={handleForm} />
                <input className={styles.row_input} placeholder="State" name="state" onChange={handleForm} />
                <input className={styles.row_input} placeholder="Zip code" name="zip" onChange={handleForm} />
              </div>
            </div>


            <button className={styles.submit_button} onClick={handleContinue}>
              Continue
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
