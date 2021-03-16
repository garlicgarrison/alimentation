import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"

import Layout from '../components/layouts/Layout'

export default function Home() {

  const [coordinates, setCoordinates] = useState<Object>({latitude: null, longitude: null});
  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    
  }, [])

  const locationOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  }

  const successCallback = position => {
    console.log(position)
    setLocationError(null)
    setCoordinates(position.coords)
  }

  const errorCallback = error => {
    console.log(error)
    setLocationError(error)
  }

  const getLocation = e => {
    console.log("getlocation")
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, locationOptions)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} align-items={styles.left}>
        <div className={styles.zip_input_container}>
          <h1>Alimentation</h1>

          <div className = {styles.location_section}>
            {
              locationError &&
            <span className = {styles.location_error}>{locationError.message}</span>
            }

            <div className={styles.input_area}>
              <input className={styles.address_input} placeholder="Address, City, or Zip Code" />
              <button className={styles.nav_button} onClick={getLocation}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" aria-hidden="true" fill="#8CB401">
                  <path d="M.545 11.348l19.821-8.37a.5.5 0 0 1 .655.656l-8.369 19.82a.5.5 0 0 1-.952-.104l-1.688-9.282a.1.1 0 0 0-.08-.08L.65 12.3a.5.5 0 0 1-.105-.952z">
                  </path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getLayout = page => <Layout>{page}</Layout>
