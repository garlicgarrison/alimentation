import firebase from '../firebase/config'
import "firebase/auth"

const db = firebase.firestore();

export const getItem = (storeId: string, itemId: string) => {
    console.log(storeId, itemId)
    db.collection("stores").doc(storeId).collection("items").doc(itemId).get().then(itemDoc => {
        console.log(itemDoc.data())
        return itemDoc;
    })
    
}


export const getShoppingCart = (userId: string) => {
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
        console.log("snapshot", snapshot)
        snapshot.forEach(doc => {
            console.log("customer", doc)
            doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                shoppingSnap.forEach(shopDoc => {
                    return shopDoc;
                })
            })
        })
    })

}
/*
export const setShoppingCart = (userId: string, item: any, quantity: number, notes: string) => {

    
    
    db.collection("users").doc(userId).collection("customer").get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                shoppingSnap.forEach(shoppingDoc => {
                    shoppingDoc.ref.update({
                        items: firebase.firestore.FieldValue.arrayUnion({
                            image_url: item.images_preview_url,
                            item_id: item.item_id,
                            name: item.name,
                            notes: notes,
                            price: item.price,
                            quantity: {
                                amount: quantity
                            },
                            
                        })
                    })
                })
            })
        })
    })
    
}

export const testShoppingCart = (item: any) => { 
    db.collection("")
}*/
