import { initializeApp } from 'firebase/app'
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore/lite'
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const auth = getAuth(app)

const usersCollection = collection(db, 'users')

export async function loginUser(creds) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    )
    return userCredential.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function logoutUser() {
  try {
    await auth.signOut()
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function registerUser(creds) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    )

    let imageURL
    if (creds.imageURL) {
      const storage = getStorage(app)
      const storageRef = ref(
        storage,
        `profilePictures/${userCredential.user.uid}`
      )

      await uploadString(storageRef, creds.imageURL, 'data_url')

      imageURL = await getDownloadURL(storageRef)
    }

    const userData = {
      name: creds.name,
      email: userCredential.user.email,
      uid: userCredential.user.uid,
      imageURL: imageURL || '',
    }

    await setDoc(doc(usersCollection, userCredential.user.uid), userData)

    return userCredential.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function deleteUser(userId, password) {
  try {
    const user = auth.currentUser

    if (!user) {
      throw new Error('No user is currently logged in!')
    }

    const credential = EmailAuthProvider.credential(user.email, password)

    await user.reauthenticateWithCredential(credential)
    await deleteDoc(doc(usersCollection, userId))
    await user.delete()
  } catch (error) {
    throw new Error(error.message)
  }
}
