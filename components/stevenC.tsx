import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"
import { delBasePath } from 'next/dist/next-server/lib/router/router'

export default function stevenC(show) {
  const [shoppingCart, setShoppingCart] = useState([])
  const [review, setReview] = useState([])

  var shoppingCartRef = firebase.firestore().collectionGroup("shopping_cart")

  useEffect(() => {
    shoppingCartRef.limit(1).get()
      .then(snapshot => {
        snapshot.forEach(subDoc => {
          setShoppingCart([...shoppingCart, subDoc.data()])
        })
      })
  }, [])

  var reviewAddressRef = firebase.firestore().collectionGroup("reviews")

  useEffect(() => {
    reviewAddressRef.get().then(snapshot => {
      snapshot.forEach(subDoc => {
        setReview([...review, subDoc.data()])
      })
    })
  }, [])

  return (<div>
            {show && "shoppingCart"}
            {show && <span> {JSON.stringify(shoppingCart)} </span>}
            {show && "reviews"}
            {show && <span>{JSON.stringify(review)}</span>}</div>)
}
