// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

//! ========================================
//! ******* READ AND WRITE DATA *******

import {
  getDatabase,
  ref,
  // push,
  set,
  onValue,
  query,
  remove,
  update,
  child,
  get,
} from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successNote, toastError, toastLogout } from "../utils/customToastify";
// import { successNote } from "../utils/customToastify";

//***************************************** */

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);

//!Initialize Firebase Authentication and get auth info
const auth = getAuth(app);

export const userStateChecker = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};
//! Sign Up with Google Provider
export const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, provider)
    .then((res) => {
      // console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

//!Logout
export const logOut = () => {
  signOut(auth);
  toastLogout("Logout completed.");
  // console.log(auth);
};

// //! Creating New User (Register)
export const createUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toastError(errorMessage);
    console.log(errorCode, errorMessage);
  }
};

// export const createUser = async (email, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       // const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       toastError(errorMessage);
//       console.log(errorCode, errorMessage);
//       // ..
//     });
// };

//!Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    successNote("Login performed successfully.");
    console.log(userCredential);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toastError(errorMessage);
    console.log(error);
    // alert("Login is failed!");
  }
};

//*************************************** *******************/
//*************************************** ******************/
//! ========================================
//! ******* WRITE DATA *******

export const writeUserData = (userId, addCard) => {
  const db = getDatabase();

  set(ref(db, "cards/" + userId), addCard);

  // const cardRef = ref(db, "cards");
  // const newCardRef = push(cardRef);
  // set(newCardRef, {
  //   id: addCard.id,
  //   email: addCard.email,
  //   title: addCard.title,
  //   image: addCard.image,
  //   text: addCard.text,
  //   date: addCard.date,
  // });
  console.log(addCard, "veri eklendi");
};

//! ******* READ DATA *******
export const useFetch = () => {
  const [cards, setCards] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const db = getDatabase();
    const userRef = ref(db, "cards");

    onValue(query(userRef), (snapshot) => {
      const cards = snapshot.val();

      // send an array of the values in database
      // const cardsArray = Object.values(cards);
      const cardsArray = [];
      for (let id in cards) {
        cardsArray.push({ id, ...cards[id] });
      }

      setCards(cardsArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, cards };
};

//! ******* DELETE DATA *******

export const deleteCard = (id) => {
  const db = getDatabase();
  // const userRef = ref(db, 'contact');
  remove(ref(db, "cards/" + id));
  successNote("Deleted");
};

//************************************ */
//! ******* UPDATE DATA *******

export const getDataForUpdate = (id, setUpdate) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `cards/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUpdate(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateCard = (id, title, image, text, email, date) => {
  const db = getDatabase();
  // A post entry.
  const postData = {
    id: id,
    title: title,
    image: image,
    text: text,
    email: email,
    date: date,
  };
  // const newPostKey = push(child(ref(db), "blogs")).key;
  const updates = {};
  updates["cards/" + id] = postData;
  // updates["/user-blogs/" + id + "/" + newPostKey] = postData;

  return update(ref(db), updates);
};

// export const updateCard = (card) => {
//   const db = getDatabase();
//   const newUserKey = push(child(ref(db), "cards/")).key;
//   const updates = {};
//   updates["cards/" + newUserKey] = card;
//   return update(ref(db), updates);
// };
