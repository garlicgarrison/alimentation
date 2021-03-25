import React, { useContext } from 'react';
//@ts-ignore
import styles from '../../styles/components/navbars/Navbar.module.scss'
import Link  from 'next/link';
import { Context } from '../state/ContextProvider';



export default function Navbar() {
    const {authState, setauthState} = useContext(Context)

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
                            </ul>
                        </div>
                    }



                </div>
            </nav>
        </header>
    )
}