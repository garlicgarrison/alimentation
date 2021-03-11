import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from 'react'
import firebase from '../firebase/config'
import "firebase/firestore"

export default function stevenC(show) {
  const [shoppingCart, setShoppingCart] = useState([])
  const [review, setReview] = useState([])

  var db = firebase.firestore()

  var customerAddress = db.collection("users").doc("UscGMWWmeFM7LL7klTZbGIpQCXU2").collection("customer")
  var shoppingCartAddress = customerAddress.doc("JEHHM8bcfX0NCCZS4nMZ").collection("shopping_cart")

    useEffect(() => {
      shoppingCartAddress.get().then(snapshot => {
        snapshot.forEach(doc => {
          setShoppingCart([...shoppingCart, doc.data()])
        })
      })
    }, [])

    var reviewAddress = db.collection("users").doc("UscGMWWmeFM7LL7klTZbGIpQCXU2").collection("driver").doc("fKf3qup76kCQZzUUXE2j").collection("reviews")

    useEffect(() => {
      reviewAddress.get().then(snapshot => {
        snapshot.forEach(doc => {
          setReview([...review, doc.data()])
          console.log(review)
        })
      })
    }, [])

    return (<div>
              {show && "shoppingCart"}
              {show && <span> {JSON.stringify(shoppingCart[0])} </span>}
              {show && "reviews"}
              {show && <span>{JSON.stringify(review[0])}</span>}</div>)
}
