import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase
  .initializeApp({
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID
  })
  .firestore();

const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export function saveDocumentToDatabase(collection, documentId, data) {
  return db
    .collection(collection)
    .doc(documentId)
    .set({
      ...data,
      timestamp: serverTimestamp()
    });
}

export async function loadCollectionFromDatabase(collection) {
  const querySnapshot = await db.collection(collection).get();
  return querySnapshot.docs.map(doc => doc.data());
}
