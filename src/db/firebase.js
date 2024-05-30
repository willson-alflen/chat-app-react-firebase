import { initializeApp } from 'firebase/app'
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  setDoc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
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
const chatsCollection = collection(db, 'chats')

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

function generateSearchKeywords(name) {
  const arrName = name.split(' ')
  const keywords = []
  arrName.forEach((word) => {
    let keyword = ''
    for (let char of word) {
      keyword += char
      keywords.push(keyword.toLowerCase())
    }
  })
  return keywords
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
      searchKeywords: generateSearchKeywords(creds.name),
      chats: [],
    }

    await setDoc(doc(usersCollection, userCredential.user.uid), userData)

    await updateProfile(userCredential.user, {
      displayName: creds.name,
      photoURL: imageURL || '',
    })

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

export async function findUserByUsername(username) {
  try {
    const querySnapshot = await getDocs(
      query(
        usersCollection,
        where('searchKeywords', 'array-contains', username.toLowerCase())
      )
    )
    return querySnapshot.docs.map((doc) => doc.data())
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function createChat(currentUser, chatWithUser) {
  try {
    const chatId =
      currentUser.uid < chatWithUser.uid
        ? currentUser.uid + chatWithUser.uid
        : chatWithUser.uid + currentUser.uid
    const chat = {
      id: chatId,
      users: [currentUser.uid, chatWithUser.uid],
      messages: [],
    }
    await setDoc(doc(chatsCollection, chat.id), chat)
    return chat
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function getChatIfExists(currentUser, chatWithUser) {
  const chatId =
    currentUser.uid < chatWithUser.uid
      ? currentUser.uid + chatWithUser.uid
      : chatWithUser.uid + currentUser.uid
  const q = query(chatsCollection, where('id', '==', chatId))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data()
  } else {
    return null
  }
}

export async function addUserToChat(userId, chatId) {
  const userRef = doc(usersCollection, userId)
  await updateDoc(userRef, {
    chats: arrayUnion(chatId),
  })
}

export async function addMessageToChat(chatId, message) {
  const chatRef = doc(chatsCollection, chatId)
  await updateDoc(chatRef, {
    messages: arrayUnion(message),
  })
}

export function getChatMessages(chatId, setChatMessages) {
  const docRef = doc(db, `chats/${chatId}`)

  const unsubscribe = onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        if (data.messages) {
          // Sort messages by timestamp
          const sortedMessages = data.messages.sort(
            (a, b) => a.timestamp - b.timestamp
          )
          setChatMessages(sortedMessages)
        } else {
          console.error('No messages field in chat document')
        }
      } else {
        console.error('No such document!')
      }
    },
    (error) => {
      console.error('Error fetching chat messages: ', error)
    }
  )

  return unsubscribe
}

export async function getChatsForUser(userId) {
  const userDocRef = doc(usersCollection, userId)
  const userDoc = await getDoc(userDocRef)
  if (!userDoc.exists()) {
    throw new Error('User not found in database')
  }

  const chatIds = userDoc.data().chats
  const chats = await Promise.all(
    chatIds.map(async (chatId) => {
      const chatDocRef = doc(chatsCollection, chatId)
      const chatDoc = await getDoc(chatDocRef)
      if (!chatDoc.exists()) {
        throw new Error(`Chat not found: ${chatId}`)
      }

      const chatData = chatDoc.data()
      const chatWithUserId = chatData.users.find((id) => id !== userId)
      const chatWithUserDocRef = doc(usersCollection, chatWithUserId)
      const chatWithUserDoc = await getDoc(chatWithUserDocRef)
      if (!chatWithUserDoc.exists()) {
        throw new Error(`Chat with user not found: ${chatWithUserId}`)
      }

      return {
        ...chatData,
        chatWithUser: chatWithUserDoc.data(),
      }
    })
  )
  return chats
}

// export async function getChatsForUser(userId) {
//   const querySnapshot = await getDocs(
//     query(usersCollection, where('uid', '==', userId))
//   )
//   if (!querySnapshot.empty) {
//     return querySnapshot.docs[0].data().chats
//   } else {
//     return []
//   }
// }
