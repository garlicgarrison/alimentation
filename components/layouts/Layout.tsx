import React from 'react';
import Navbar from '../navbars/Navbar'

export default function Layout({children})
{
    return (
        <>
            <Navbar/>
            <main>
                {children}
            </main>
        </>
    )

}