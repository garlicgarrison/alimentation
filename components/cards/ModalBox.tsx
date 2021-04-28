import {useEffect, useRef} from 'react'
import styles from '../../styles/components/cards/ModalBox.module.scss'

/**
 * Modal Box with blured background
 * @param {string} cardType - Use "default" card or create custom card by specifying cardType = "custom"
 * @param {string} title - If using default card, specify card title
 * @param {string} description - If using default card, specify card description
 * @param {string} applyButtonName - If using default card, specify card applyButtonName
 * @param {string} applyButtonCallback - If using default card, specify apply button callback function
 * @param {string} applyButtonDisable - If using default card, use this boolean variable to disable apply button
 * @param {string} cancelButtonCallback - If using default card, specify cancel button callback function
 * @param {string} cancelButtonName - If using default card, specify card cancelButtonName
 */
export default function ModalBox({ children , cardType = "custom", title = "none", description = "none", cancelButtonCallback = null, dark=0.001, card=false, position="center"}){

    const modalRef = useRef(null);

    const handleClick =  (event) => {
        
        if (modalRef.current && !modalRef.current.contains(event.target))
        {
            if (cancelButtonCallback){
                cancelButtonCallback(event)
            }
        }

    }


    useEffect(()=> {
        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    },[])

    return(
        <>

            {cardType === "custom" && (
                <div className={card ? styles.overlay_open_card:styles.overlay_open} >
                    <main 
                    style={{background: `rgba(0, 0 , 0, ${dark})`}} 
                    className={position === "center" ? styles.main_container : styles.right_main_container}>
                        <div ref={modalRef} className = {styles.children_container}>
                            {children}
                        </div>
                    </main>
                </div>
            )}

            {cardType === "default" && (
                <div className={card ? styles.overlay_open_card:styles.overlay_open}>
                    <div className={ styles.popup_edit_container} >
                        <div className={styles.popup_card_container} ref = {modalRef}>
                            <div className={styles.popup_header_container}>
                                <span className={styles.popup_header}>{title}</span>
                            </div>

                            <main className={styles.main_container_default}>{children}</main>

                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
