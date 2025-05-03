import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveFavorites = async (userId, favorites) => {
  await setDoc(doc(db, 'favorites', userId), { favorites });
};

export const getFavorites = async (userId) => {
  const docRef = doc(db, 'favorites', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().favorites : [];
};