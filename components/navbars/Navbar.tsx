import React from 'react';
//@ts-ignore
import styles from '../../styles/components/navbars/Navbar.module.scss'
import Link  from 'next/link';

export default function Navbar() {
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



                </div>
            </nav>
        </header>
    )
}