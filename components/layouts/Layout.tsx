import React from 'react';
import Navbar from '../navbars/Navbar'
import styles from '../../styles/components/layouts/Layout.module.scss'

export default function Layout({children})
{
    return (
        <>
            <Navbar/>
            <main className = {styles.main}>
                {children}
            </main>
        </>
    )

}