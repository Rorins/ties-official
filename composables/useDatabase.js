import { ref } from "vue";
import { doc, setDoc, getDoc, getDocs, addDoc, updateDoc, collection, query, where} from "firebase/firestore";
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


    // Chat system
  const createChat = async (currentUserId, router) => {
    try {
      const chatCollectionRef = collection(db, 'chat');
      const docRef = await addDoc(chatCollectionRef, { userId: currentUserId });
      const chatId = docRef.id;
      // Pushing to a random chat room
      router.push(`/chat/${chatId}`);
    } catch (err) {
      console.log(err.message);
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
    const updateUserData = async (uid, newData) => {
      try {
        const userRef = doc(db, "users", uid);
        const userData = await getDoc(userRef);
        
        if (userData.exists()) {
          const existingData = userData.data();
          const mergedData = {
            ...existingData, 
            ...newData, 
          };
          
          await setDoc(userRef, mergedData);
          console.log("User data updated successfully");
          error.value = null;
        } else {
          console.log("User data not found");
        }
      } catch (err) {
        console.log("Update user error", err.message);
        error.value = err.message;
      }
    };

  // all documents by type
  const getUsersByUserType = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("userType", "==", "listener"));
      const querySnapshot = await getDocs(q);
      
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      
      return users;
    } catch (err) {
      console.log(err.message, "error for listeners");
      error.value = err.message;
    }
  };
   
    //Chat system
    const sendMessage = async (chatId, userId, messageText) => {
      try {
        await setDoc(doc(db, "users", uid), data);
        const chatRef = doc(db, "chat", chatId);
        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
          const chatData = chatDoc.data();
          const newMessage = {
            id: Date.now().toString(),
            user: userId,
            timestamp: new Date().toISOString(),
            text: messageText,
          };
          chatData.messages.push(newMessage);
          await updateDoc(chatRef, { messages: chatData.messages });
          console.log("New message sent in chat room ", chatId);
        } else {
          console.error("Chat room not found!");
        }
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    };
    
  
    return {
      error,
      getUserData,
      addUserData,
      updateUserData,
      createChat,
      getUsersByUserType,
    };
  };
  
  export default useDatabase;
