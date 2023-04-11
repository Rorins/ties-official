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
      if (err.code == "auth/invalid-email") {
        error.value = "invalid email";
      }
      else if(err.code == "auth/email-already-in-use") {
        error.value = "e-mail already in use";
      }
      else if(err.code == "auth/weak-password") {
        error.value = "password should be at least 6 characters long";
      }
      else{
        error.value = "please fill all the required fields";
      }
      throw err
    }
  };
  

  const loginUser = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      error.value = null;
      return user;
    } catch (err) {
      if (err.code == "auth/invalid-email") {
        error.value = "Invalid email";
      }
      else if(err.code == "auth/email-already-in-use") {
        error.value ="e-mail already in use";
      }
      else if(err.code == "auth/weak-password") {
        error.value ="password should be at least 6 characters long";
      }
      else if(err.code == "auth/wrong-password") {
        error.value ="wrong password";
      }
      else{
        error.value ="please fill all the required fields";
      }
      throw err
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
      error.value = err.message;
      if(err.code == "auth/email-already-in-use"){
        alert("your e-mail is already in our database");
      }
      else{
        alert(error.value);
      }
      throw err
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
