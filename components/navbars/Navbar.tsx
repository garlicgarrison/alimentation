import React, { useContext, useRef, useEffect, useState } from 'react';
//@ts-ignore
import styles from '../../styles/components/navbars/Navbar.module.scss'
import Link from 'next/link';
import { Context } from '../state/ContextProvider';
import { useRouter } from 'next/router'
import { logout } from '../../service/auth/auth';
import { getShoppingCart } from '../../service/items';
import firebase from '../../firebase/config'
import "firebase/auth"
import ModalBox from '../cards/ModalBox';
import ShopItem from '../cards/ShopItem';

const db = firebase.firestore();

export default function Navbar() {
    const router = useRouter()
    const { authState, setauthState } = useContext(Context)
    const [dropdown, setDropDown] = useState(false);
    const [shopCart, setShopCart] = useState(null)
    const [showCart, setShowCart] = useState(false)
    const [driver, setDriver] = useState(false)
    
    useEffect(() => {
        
        if (authState.user)
        {
            db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
                snapshot.forEach(doc => {
                    
                    doc.ref.collection("shopping_cart").onSnapshot(shoppingSnap => {
                        shoppingSnap.forEach(shopDoc => {
                            shopDoc.ref.onSnapshot(shopDocSnap => {
                                setShopCart(shopDocSnap)
                            })
                        })
                    })
                })
            })

            db.collection("users").doc(firebase.auth().currentUser.uid).collection("driver").onSnapshot(driverDocs => {
                driverDocs.forEach(driver => {
                    if (driver)
                    {
                        setDriver(true)
                    }
                })
            })

        }
      }, [authState.user])

    const handleDropdown = e => {
        setDropDown(drop => {
            return !drop;
        })
    }

    function removeDropdownCallback() {
        setDropDown(false)
    }

    const handleCancelModal = e => {
        setShowCart(false)
    }

    const deleteShopItem = (index) => {
        let tempArray = shopCart.data().items;
        tempArray.splice(index, 1)
        shopCart.ref.update({
                items: tempArray
        })
    }

    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.nav_elements}>
                    {/*left elements */}
                    <div className={styles.left_elements}>
                        <h1 className={styles.header}>

                            <Link href={{ pathname: "/" }}>
                                Alimentation
                            </Link>
                        </h1>
                    </div>

                    {/*right elements */}
                    {/* not logged in */}

                    {
                        !authState.loggedIn &&
                        <div className={styles.right_elements}>
                            <ul>
                                <li>
                                    <Link href={{ pathname: '/login' }}>
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{ pathname: '/signup' }}>
                                        <a className={styles.sign_up}>
                                            Sign up
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    }

                    {
                        authState.loggedIn &&
                        <div className={styles.right_elements_logged_in}>
                            <ul>
                                <li>
                                    <Link href={{ pathname: '/profile' }}>
                                        <a>
                                            <img src={authState.user.photoURL} className={styles.avatar} />
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{ pathname: '/profile' }}>
                                        <a>
                                            {authState.user.displayName}
                                        </a>
                                    </Link>
                                </li>
                                {
                                    driver && 
                                    <li>
                                        <Link href={{pathname: '/driver'}}>
                                            <a className = {styles.driver_link}>
                                                Driver
                                            </a>
                                        </Link>
                                    </li>
                                }
                               
                                <li>
                                    <div className={styles.down_arrow_container} onClick={handleDropdown}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill="#E9692C" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                                        </svg>
                                    </div>
                                    {
                                        dropdown &&
                                        <DropDown removeDropdown={removeDropdownCallback} />
                                    }
                                </li>
                                <li>
                                    <button className={styles.shopping_cart} onClick = {e=>setShowCart(true)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 9H13V6H16V4H13V1H11V4H8V6H11V9ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75Z" fill="white" />
                                        </svg>
                                        Cart
                                        {
                                            shopCart && 
                                            <span>
                                                (
                                                    
                                                    {shopCart.data().items.length}
                                                )
                                            </span>
                                        }
                                    </button>
                                </li>
                            </ul>
                            
                        </div>
                    }



                </div>
            </nav>
            {
                showCart && shopCart &&
                <ModalBox cardType="custom" cancelButtonCallback = {handleCancelModal} position = "right">
                    <div className = {styles.shopping_cart_container}>
                        <header className = {styles.shopping_cart_header}>
                            Shopping Cart
                        </header>
                        <div className = {styles.cart_items_container}>
                            {
                                shopCart.data().items.map((item, index) => {
                                    
                                    return (
                                        <div className = {styles.shop_item}>
                                            <ShopItem item = {item} index = {index} deleteItem={deleteShopItem}/>
                                            {
                                                index !== shopCart.data().items.length - 1 &&
                                                <hr style={{opacity: "20%"}}/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className = {styles.delivery_info}>
                            <div><b>Delivery Fee:</b> <span>${shopCart.data().delivery.toFixed(2)}</span></div>
                            <div><b>Tax:</b> <span>${shopCart.data().tax.toFixed(2)}</span></div>
                            <div><b>Total Cost:</b> <span>${shopCart.data().total_cost.toFixed(2)}</span></div>
                            <button className = {styles.checkout_button} 
                            onClick={() => 
                                {
                                    setShowCart(false)
                                    router.push('/checkout')
                                }
                            }>
                                Continue to Checkout
                            </button>
                        </div>
                    </div>
                </ModalBox>
            }
        </header>
    )
}

const DropDown = ({ removeDropdown }) => {
    const dropdownRef = useRef(null)
    const router = useRouter();

    const dropdownHandler = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
            removeDropdown();
        }

    }

    const logoutRedirect = (e) => {
        logout();
        router.push("/")
    }

    useEffect(() => {
        document.addEventListener('mousedown', dropdownHandler)
        return () => document.removeEventListener('mousedown', dropdownHandler)
    }, [])

    return (
        <div className={styles.dropdown_container} ref={dropdownRef}>
            <ul>
                <li>
                    <Link href={{ pathname: "/profile" }}>
                        <a>Profile</a>
                    </Link>
                </li>

                <br />

                <li>
                    <Link href={{ pathname: '/orders' }}>
                        <a>My Orders</a>
                    </Link>
                </li>
                
                <br />

                <li>
                    <button className={styles.logout_button} onClick={logoutRedirect}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.09 12.59L8.5 14L13.5 9L8.5 4L7.09 5.41L9.67 8H0V10H9.67L7.09 12.59ZM16 0H2C0.89 0 0 0.9 0 2V6H2V2H16V16H2V12H0V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z" fill="grey" />
                        </svg>

                    Logout
                    </button>
                </li>
            </ul>

        </div>
    )
}