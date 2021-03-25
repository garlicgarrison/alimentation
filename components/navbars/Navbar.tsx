import React, { useContext, useRef, useEffect, useState } from 'react';
//@ts-ignore
import styles from '../../styles/components/navbars/Navbar.module.scss'
import Link  from 'next/link';
import { Context } from '../state/ContextProvider';
import {useRouter} from 'next/router'
import { logout } from '../../service/auth/auth';


export default function Navbar() {
    const {authState, setauthState} = useContext(Context)
    const [dropdown, setDropDown] = useState(false);


    const handleDropdown = e => {
        setDropDown(drop => {
            return !drop;
        })
    }

    function removeDropdownCallback() {
        setDropDown(false)
    }

    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.nav_elements}>
                    {/*left elements */}
                    <div className={styles.left_elements}>
                        <h1 className={styles.header}>

                            <Link href={{pathname: "/"}}>
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
                                    <Link href={{pathname: '/login'}}>
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{pathname: '/signup'}}>
                                        <a className = {styles.sign_up}>
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
                                    <Link href={{pathname: '/profile'}}>
                                        <a>
                                            <img src = {authState.user.photoURL} className = {styles.avatar}/>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={{pathname: '/profile'}}>
                                        <a>
                                          {authState.user.displayName}  
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                        <div className={styles.down_arrow_container} onClick={handleDropdown}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="#E9692C" d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                                            </svg>
                                        </div>
                                </li>
                            </ul>
                            {
                                    dropdown &&
                                    <DropDown removeDropdown={removeDropdownCallback} />
                                }
                        </div>
                    }



                </div>
            </nav>
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