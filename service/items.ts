import firebase from '../firebase/config'
import "firebase/auth"

const db = firebase.firestore();

export const getItem = (storeId: string, itemId: string) => {
    
    db.collection("stores").doc(storeId).collection("items").doc(itemId).get().then(itemDoc => {
        
        return itemDoc;
    })
    
}


export const getShoppingCart = (userId: string) => {
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("customer").get().then(snapshot => {
        
        snapshot.forEach(doc => {
            
            doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                shoppingSnap.forEach(shopDoc => {
                    shopDoc.ref.onSnapshot(shopDocSnap => {
                        
                        return shopDoc;
                    });
                })
            })
        })
    })

}

export const setShoppingCart = (userId: string, item: any, quantity: number, notes = "") => {
    
    db.collection("users").doc(userId).collection("customer").get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.collection("shopping_cart").get().then(shoppingSnap => {
                shoppingSnap.forEach(shoppingDoc => {
                    shoppingDoc.ref.update({
                        items: firebase.firestore.FieldValue.arrayUnion({
                            image_url: item.data().images_preview_url,
                            item_id: item.data().item_id,
                            name: item.data().name,
                            notes: notes,
                            price: item.data().price,
                            quantity: {
                                amount: quantity
                            },
                            store_id: item.data().store_id === undefined ? doc.ref.parent.parent.id : item.data().store_id
                        })

                    })
                })
            })
        })
    })
    
}

