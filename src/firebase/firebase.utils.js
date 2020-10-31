import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyArrb5hUXQoEj0c1_fAmkNzyuqeemTJB_s",
    authDomain: "ecommerce-app-db-ad870.firebaseapp.com",
    databaseURL: "https://ecommerce-app-db-ad870.firebaseio.com",
    projectId: "ecommerce-app-db-ad870",
    storageBucket: "ecommerce-app-db-ad870.appspot.com",
    messagingSenderId: "151442139946",
    appId: "1:151442139946:web:72a46ec9b0f6e9aa92cc53",
    measurementId: "G-H6K88W8HE2"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({ displayName, email, createdAt, ...additionalData })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;


}

firebase.initializeApp(config);


export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;