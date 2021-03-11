import React, {useEffect, useState} from 'react';
import firebase from '../firebase/config';
import "firebase/firestore"

export default function StevenC() {
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
    {
        <span>{
            shoppingCart.map((doc,index) => {
            return <span key = {index}>{JSON.stringify(shoppingCart)}</span>
        })}
        </span>
    }
    {
        <span>{
            review.map((doc,index) => {
            return <span key = {index}>{JSON.stringify(review)}</span>
        })}
        </span>
    }
    </div>)
}
