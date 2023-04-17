import { ref } from "vue";
import { doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "~/plugins/firebase";

// user data to database
const useDatabase = () => {
    const error = ref(null);
  
    // Fetch user data from Firestore
    const getUserData = async (uid) => {
      try {
        const userData = await getDoc(doc(db, "users", uid));
        if (userData.exists) {
          return userData.data();
        } else {
          console.log("No user data available");
        }
      } catch (err) {
        console.log(err.message);
        error.value = err.message;
      }
    };
  
    // Add new data to Firestore
    const addUserData = async (uid,data) => {
      try {
        await setDoc(doc(db, "users", uid), data);
        console.log("User data added successfully");
        error.value = null;
      } catch (err) {
        console.log("add user error",err.message);
        error.value = err.message;
      }
    };
    
    //Update data
    const updateUserData = async (uid, data) => {
      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, data);
        console.log("User data updated successfully");
        error.value = null;
      } catch (err) {
        console.log("update user error", err.message);
        error.value = err.message;
      }
    };
  
    return {
      error,
      getUserData,
      addUserData,
      updateUserData,
    };
  };
  
  export default useDatabase;
