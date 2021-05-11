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
import { setUserInfo } from '../service/auth/auth';
import { createDriver } from '../service/delivery';


export default function Profile() {

  const router = useRouter()

  const { authState, setauthState } = useContext(Context)
  const db = firebase.firestore();
  console.log(authState)

  const [userDocRef, setUserDocRef] = useState(null)
  const [editOn, setEditOn] = useState(false)
  const [driver, setDriver] = useState(false)

  const [address, setAddress] = useState({
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: ""
  })

  const [userName, setName] = useState({
    first: "",
    middle: "",
    last: ""
  })
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("Load User Data...", firebase.auth().currentUser)
    if (authState.user) {

      //@ts-ignore
      db.collection("users").doc(firebase.auth().currentUser.uid).get().then(docRef => {
        console.log(docRef)
        setUserDocRef(docRef)
      })

      db.collection("users").doc(firebase.auth().currentUser.uid).collection("driver").onSnapshot(res => {
        if (res.docs.length > 0) {
          setDriver(true)
        }
      })
    }

  }, [authState.user])

  useEffect(() => {
    if (userDocRef) {
      setAddress(userDocRef.data().main_address)
      setPhone(userDocRef.data().phone_number)
      setName(userDocRef.data().name)
    }
  }, [userDocRef])

  const isComplete = (): boolean => {
    return !(address.street1 === ""
      || address.city === ""
      || address.state === ""
      || address.zip === ""
      || userName.first === ""
      || userName.last === ""
      || phone === "")
  }

  const handleContinue = async (e) => {

    if (!isComplete()) {
      setError("Please fill in all fields (middle name and street 2 are optional)")
      return;
    }
    else {
      setUserInfo(address, userName, phone).then(() => {
        router.push("/stores")
      }).catch(error => {
        setError(error.message)
      })


    }

  }

  const handleForm = (event) => {
    const { value, name } = event.target;
    console.log(value)
    let tempName = userName;
    let tempAdd = address;
    switch (name) {
      case "first":
        tempName.first = value;
        setName(Object.assign(tempName))
        break;
      case "last":
        tempName.last = value;
        setName(Object.assign(tempName))
        break;
      case "middle":
        tempName.middle = value;
        setName(Object.assign(tempName))
        break;
      case "phone_number":
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
    console.log(address)

  }

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
            {
              !driver &&
              <button className={styles.driver} onClick={createDriver}>
                Become a driver
              </button>
            }
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
                        <input defaultValue={userDocRef.data().name.first} className={styles.input_area} placeholder="First Name" name="first" onChange={handleForm} />
                        <input defaultValue={userDocRef.data().name.middle} className={styles.input_area} placeholder="Middle Name" name="middle" onChange={handleForm} />
                        <input defaultValue={userDocRef.data().name.last} className={styles.input_area} placeholder="Last Name" name="last" onChange={handleForm} />
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
                        <input defaultValue={userDocRef.data().phone_number} className={styles.input_area} placeholder="Phone Number" name="phone_number" onChange={handleForm} />
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
                          <input defaultValue={userDocRef.data().main_address.street1} className={styles.input_area} placeholder="Street 1" name="street1" onChange={handleForm} />
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
                          <input defaultValue={userDocRef.data().main_address.street2} className={styles.input_area} placeholder="Street 2" name="street2" onChange={handleForm} />
                        </div>
                      }
                    </span>
                    <div className={styles.city_state}>
                      <span className={styles.city}>
                        {
                          userDocRef && !editOn &&
                          userDocRef.data().main_address.city
                        }
                        {
                          userDocRef && editOn &&
                          <div>
                            <input defaultValue={userDocRef.data().main_address.city} className={styles.input_area} placeholder="City" name="city" onChange={handleForm} />
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
                            <input defaultValue={userDocRef.data().main_address.state} className={styles.input_area} placeholder="State" name="state" onChange={handleForm} />
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
                          <input defaultValue={userDocRef.data().main_address.zip} className={styles.input_area} placeholder="Zip Code" name="zip" onChange={handleForm} />
                        </div>
                      }
                    </span>
                  </div>
                </div>


                {
                  !editOn &&
                  <button className={styles.submit_button} disabled={userDocRef === null} onClick={() => setEditOn(true)}>
                    Edit Profile
                </button>
                }
                {
                  editOn &&
                  <div>
                    <button className={styles.submit_button} disabled={userDocRef === null} onClick={() => setEditOn(false)}>
                      Discard
                  </button>
                    <button className={styles.submit_button} disabled={userDocRef === null} onClick={handleContinue}>
                      Save
                  </button>
                  </div>
                }
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
