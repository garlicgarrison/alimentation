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
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="80" height="80" fill="url(#pattern0)"/>
                                <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlinkHref="#image0" transform="scale(0.00195312)"/>
                                </pattern>
                                </defs>
                            </svg>

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