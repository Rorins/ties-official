import { ref } from "vue";
import { auth } from "~/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

const useAuth = () => {
  const currentUser = ref(null);
  const error = ref(null);

  //E-mail for verification or password reset
const verifyEmail= async () => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("User not signed in");
    }
    await sendEmailVerification(user)
    error.value = null
  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }
}

const passwordResetEmail = async (email) => {
    try {
      await sendPasswordResetEmail(
        auth,
        email,
      );
      error.value = null;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

//User
  const createUser = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      error.value = null;
      return user;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };
  

  const loginUser = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      error.value = null;
      return user;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const logoutUser = async () => {
    try {
      await auth.signOut();
      currentUser.value = null;
      error.value = null;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };


  //Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      error.value = null;
      return user;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      error.value = null;
      //From use object user
      const { email, uid } = user;
      await createUserWithEmailAndPassword(auth, email, uid);
      return user;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  // User state change, logged in or logged out
  auth.onAuthStateChanged((user) => {
    currentUser.value = user;
    console.log("current user", currentUser.value);
  });

  return {
    error,
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    loginWithGoogle,
    signUpWithGoogle,
    verifyEmail,
    passwordResetEmail
  };
};

export default useAuth;
