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

    //Creating messages
  const createMessages = async (data) => {
    try {
      const messageCollectionRef = collection(db, 'messages');
      const docRef = await addDoc(messageCollectionRef, data );
      console.log(docRef, "document Id")
      return data
    } catch (err) {
      console.log(err.message);
    }
  };

    // Chat system
  const createChat = async (currentUserId, userName, router) => {
    try {
      const chatCollectionRef = collection(db, 'chat');
      const docRef = await addDoc(chatCollectionRef, { chatId: null, userId: currentUserId, userName: userName });
      const chatId = docRef.id;
      await updateDoc(docRef, { chatId });
      // Pushing to a random chat room
      router.push(`/chat/${chatId}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getMessagesByChatId = async (chatId) => {
    try {
      const messagesCollectionRef = collection(db, 'messages');
      const q = query(messagesCollectionRef, where('chatRoomId', '==', chatId));
      const querySnapshot = await getDocs(q);

      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      return messages;
    } catch (err) {
      console.log(err.message, "what is the error");
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
    
     // get all document inside chat
  const getChatDocuments= async () => {
    try {
      const chatCollectionRef = collection(db, 'chat');
      const querySnapshot = await getDocs(chatCollectionRef);
      const chatDocuments = querySnapshot.docs.map((doc) => doc.data());
      return chatDocuments;
    } catch (error) {
      console.log(error.message , "returned chats");
    }
  }
    
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
   
  
    return {
      error,
      getUserData,
      addUserData,
      updateUserData,
      createChat,
      getUsersByUserType,
      createMessages,
      getChatDocuments,
      getMessagesByChatId,
    };
  };
  
  export default useDatabase;
