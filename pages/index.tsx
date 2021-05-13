import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, { useEffect, useState } from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import Link from 'next/link';

import Layout from '../components/layouts/Layout'
import { useRouter } from 'next/router'

export default function Home() {

  const [coordinates, setCoordinates] = useState<Object>({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null)
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {

  }, [])

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }



  const getLocation = async e => {
    e.preventDefault();
    setLoading(true)
    navigator.geolocation.getCurrentPosition(async position => {
      console.log("loading", loading)
      if (position && position.coords) {
        let res =
          await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.GEO_KEY}`)
        console.log(res)
        let addressRes = await res.json();
        console.log(addressRes)
        if (addressRes.results.length)
        {
          setAddress(addressRes.results[0].formatted_address)
        }
        setLoading(false)
        setLocationError("Could not find address foo")
      }
    })
  }

  const checkStores = async e => {
    e.preventDefault();
    setLoading(true);
    let urlEncodeAddy = encodeURIComponent(address).replace(/%20/g, "+")
    let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlEncodeAddy}&key=${process.env.GEO_KEY}`)
    let addressRes = await res.json();
    if (addressRes.results.length && addressRes.results[0].formatted_address)
    {
      let tempAdd = {
        street1:"",
        street2: "",
        city: "",
        state: "",
        zip: ""
      }
      addressRes.results[0].address_components.forEach(comp => {
        if (comp.types.includes("street_number"))
        {
          tempAdd.street1 = comp.long_name;
        }
        else if (comp.types.includes("route"))
        {
          tempAdd.street1 += comp.short_name;
        }
        else if (comp.types.includes("locality"))
        {
          tempAdd.city = comp.short_name
        }
        else if (comp.types.includes("administrative_area_level_1"))
        {
          tempAdd.state = comp.short_name;
        }
        else if (comp.types.includes("postal_code"))
        {
          tempAdd.zip = comp.long_name
        }
      })
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
        main_address: tempAdd
      })
      router.push("/stores")
    }
    setLocationError("We could not find your address")
    setLoading(false);

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Alimentation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.zip_input_container}>
          <div className={styles.site_title}>
            <img src="https://cdn.discordapp.com/attachments/804082580525154351/821441798529482752/mango2.png" className={styles.website_logo} />
            <div>
              <span>Find your groceries at</span>
              <h1>Alimentation</h1>
            </div>
          </div>

          <div className={styles.location_section}>
            {
              locationError &&
              <span className={styles.location_error}>{locationError.message}</span>
            }

            <div className={styles.input_area}>
              <input className={styles.address_input} placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
              {
                loading &&
                <svg className={styles.svg_loading}>
                  <circle cx="15" cy="15" r="12"> </circle>
                </svg>

              }
              {
                !loading &&
                <button className={styles.nav_button} onClick={getLocation}>
                  <svg width="24px" height="24px" viewBox="0 0 24 24" aria-hidden="true" fill="#8CB401">
                    <path d="M.545 11.348l19.821-8.37a.5.5 0 0 1 .655.656l-8.369 19.82a.5.5 0 0 1-.952-.104l-1.688-9.282a.1.1 0 0 0-.08-.08L.65 12.3a.5.5 0 0 1-.105-.952z">
                    </path>
                  </svg>
                </button>
              }
            </div>
            <button onClick = {checkStores}>
                Look at stores
            </button>
              
          </div>

        </div>
      </main>


      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getLayout = page => <Layout>{page}</Layout>
