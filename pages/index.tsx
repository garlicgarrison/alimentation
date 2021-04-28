import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link from 'next/link';

import Layout from '../components/layouts/Layout'

export default function Home() {

  const [coordinates, setCoordinates] = useState<Object>({latitude: null, longitude: null});
  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    
  }, [])

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  const successCallback = async (position) => {
    
    setLocationError(null)
    setCoordinates(position.coords)
    let zipRes = await fetch(`http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&lat=36&lng=-79.08`)
  }

  const errorCallback = error => {
    
    setLocationError(error)
  }

  const getLocation = async e => {
    
    await navigator.geolocation.getCurrentPosition(successCallback, errorCallback, locationOptions)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
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
            <Link href={{ pathname: '/stores' }}>
              <a className = {styles.check_all_stores}>Check all stores</a>
            </Link>
          </div>

        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getLayout = page => <Layout>{page}</Layout>
