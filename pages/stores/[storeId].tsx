import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Stores from '.';
import ItemCard from '../../components/cards/ItemCard';
import Layout from '../../components/layouts/Layout';
import firebase from '../../firebase/config'
import styles from '../../styles/StoreView.module.scss'
import Image from 'next/image'
import { getItem } from '../../service/items';
import ModalBox from '../../components/cards/ModalBox';
import image from 'next/image';

export default function Store() {
    const router = useRouter();
    const { storeId } = router.query;

    const [storeData, setStoreData] = useState(null)
    const [items, setItems] = useState([])
    const [imageurl, setimageurl] = useState(null)
    const [modal, setModal] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [currentItemImages, setCurrentItemImages] = useState([])
    const [imageIndex, setIndex] = useState(0)

    const storage = firebase.storage();

    useEffect(() => {
        if (storeId) {
            //@ts-ignore
            firebase.firestore().collection("stores").doc(storeId).get().then(doc => {
                setStoreData(doc.data())
                storage.ref(`stores/${doc.data().image_url}`).getDownloadURL().then(url => {
                    setimageurl(url)
                })
                //@ts-ignore
                firebase.firestore().collection("stores").doc(storeId).collection("items").get().then(snapshot => {
                    let tempItems = []
                    snapshot.forEach(doc => {
                        tempItems.push(doc)
                    })
                    setItems(tempItems)
                })
            })
        }
    }, [storeId])

    useEffect(() => {
        console.log("current item", currentItem)

        if (currentItem) {
            let temparray = []
            currentItem.data().images_url.forEach(image => {
                storage.ref(`items/${image}`).getDownloadURL().then(url => {
                    console.log("url", url)
                    temparray.push(url)
                    setCurrentItemImages(temparray)
                })
            })
        }
    }, [currentItem])

    const handleItemClick = (item) => {
        //@ts-ignore
        getItem(storeId, item.data().item_id)
        setCurrentItem(item)
        setModal(true)
    }

    const cancelModal = (e) => {
        console.log("e", e)
        setCurrentItemImages([])
        setIndex(0)
        setModal(false)
    }

    const decrementIndex = () => {
        console.log("imageindex", imageIndex)
        console.log("array", currentItemImages)
        if (imageIndex !== 0) {
            setIndex(imageIndex - 1)
        }
    }
    const incrementIndex = () => {
        console.log("imageindex", imageIndex)
        console.log("array", currentItemImages)
        if (imageIndex !== currentItemImages.length - 1) {
            setIndex(imageIndex + 1)
        }
    }
    return (
        <>
            {
                storeData &&
                <main className={styles.main_container}>
                    <div className={styles.header_container}>
                        <img src={imageurl} className={styles.store_image} />

                        <h1 className={styles.store_header}>
                            {storeData.name}
                        </h1>
                    </div>
                    <div className={styles.item_grids}>
                        {
                            items.map((item, i) => {
                                return (
                                    //@ts-ignore
                                    <div onClick={e => handleItemClick(item)}>
                                        <ItemCard itemDoc={item} key={"item" + i} />
                                    </div>
                                )

                            })
                        }
                    </div>
                    {
                        modal &&
                        <ModalBox cardType="default" cancelButtonCallback={cancelModal} title={currentItem.data().name}>
                            <div className={styles.item_modal_container}>
                                <div className={styles.left_component}>
                                    <div className={styles.image_container}>
                                        <button onClick={decrementIndex}>
                                            <svg width="38" height="44" viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0874241 21.6505L37.6745 0.151423L37.4997 43.4523L0.0874241 21.6505Z" fill="#C4C4C4" />
                                                <path d="M0.0874241 21.6505L37.6745 0.151423L37.4997 43.4523L0.0874241 21.6505Z" fill="#C4C4C4" />
                                                <path d="M0.0874241 21.6505L37.6745 0.151423L37.4997 43.4523L0.0874241 21.6505Z" fill="#C4C4C4" />
                                            </svg>
                                        </button>
                                        {
                                            currentItemImages.length > 0 &&
                                            <img src={currentItemImages[imageIndex]} className={styles.item_image} />
                                        }
                                        <button onClick={incrementIndex}>
                                            <svg width="39" height="44" viewBox="0 0 39 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M37.8537 21.6477L0.717661 43.9168L-7.62939e-06 0.621519L37.8537 21.6477Z" fill="#C4C4C4" />
                                                <path d="M37.8537 21.6477L0.717661 43.9168L-7.62939e-06 0.621519L37.8537 21.6477Z" fill="#C4C4C4" />
                                                <path d="M37.8537 21.6477L0.717661 43.9168L-7.62939e-06 0.621519L37.8537 21.6477Z" fill="#C4C4C4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className={styles.modalbox_description}>
                                        <h4 className={styles.description_title}>Description</h4>
                                        <div dangerouslySetInnerHTML={{ __html: currentItem.data().description }}></div>
                                        <h5 className={styles.description_title}>Category: {currentItem.data().category}</h5>
                                        <h5 className={styles.description_title}>Brand: {currentItem.data().brand}</h5>
                                        <h5 className={styles.description_title}>UPC: {currentItem.data().upc}</h5>

                                    </div>

                                </div>
                                <div className={styles.right_component}>
                                    <h3>{currentItem.data().name}</h3>
                                    <h5>${currentItem.data().price}</h5>
                                    <div className={styles.selection_area}>
                                        <div>
                                            <p>Quantity:</p>
                                            {/*Dropdown Selection*/}
                                            <div className = {styles.select_cart}>
                                                <select>
                                                    <option value="#">1</option>
                                                    <option value="#">2</option>
                                                    <option value="#">3</option>
                                                </select>

                                                <button className={styles.add_to_cart_button}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 9H13V6H16V4H13V1H11V4H8V6H11V9ZM7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75Z" fill="white" />
                                                    </svg>

                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </ModalBox>
                    }
                </main>
            }
        </>
    )
}

Store.getLayout = page => <Layout>{page}</Layout>