import { ref } from "vue";
import { doc, setDoc, getDoc, getDocs, addDoc, updateDoc,deleteDoc, collection, query, where, onSnapshot} from "firebase/firestore";
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

  //CHAT

    // Chat system
    const createChat = async (currentUserId, userName, about, otherInfo, router) => {
      try {
        const chatCollectionRef = collection(db, 'chat');
        const docRef = await addDoc(chatCollectionRef, { chatId: null, userId: currentUserId, userName: userName, about:about, otherInfo:otherInfo});
        const chatId = docRef.id;
        await updateDoc(docRef, { chatId });
        // Pushing to a random chat room
        router.push(`/chat/${chatId}`);
      } catch (err) {
        console.log(err.message);
      }
    };

   
    //THIS WAS MY INITIAL APPROACH, IT WORKS BUT THE DATA DOESN'T RE-RENDER OR UPDATE WHEN A DOCUMENT/MESSAGE GETS ADDED TO THE MESSAGES COLLECTION 
    //ON THE FIRESTORE DATABASE, SO IT DOESN'T GET THE UPDATED MESSAGES IF NOT BY REFRESHING THE PAGE
    //I COMMENTED IT AS IT'S THE WORKING ONE BUT DOESN'T RENDER MESSAGES IN REAL TIME

    const getMessagesByChatId = (chatId) => {
      try {
        const messages = ref([]); // <-- This will store the real-time messages

        const messagesCollectionRef = collection(db, 'messages');
        const q = query(messagesCollectionRef, where('chatRoomId', '==', chatId));

        // Listen for real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newMessages = [];
          snapshot.forEach((doc) => {
            newMessages.push(doc.data());
          });
          messages.value = newMessages; // <-- Update the messages ref with new data
        });

        // Stop listening to changes when component is unmounted or reactive dependency changes
        watchEffect((onInvalidate) => {
          onInvalidate(() => unsubscribe());
        });

        return messages; // <-- Return the ref, so you can use it in your component

      } catch (err) {
        console.error(err.message, "what is the error");
        error.value = err.message;
      }
  };
  
    // const getMessagesByChatId = async (chatId) => {
    //   try {
    //     const messagesCollectionRef = collection(db, 'messages');
    //     const q = query(messagesCollectionRef, where('chatRoomId', '==', chatId));
    //     const querySnapshot = await getDocs(q);
  
    //     const messages = [];
    //     querySnapshot.forEach((doc) => {
    //       messages.push(doc.data());
    //     });
  
    //     return messages;
    //   } catch (err) {
    //     console.log(err.message, "what is the error");
    //     error.value = err.message;
    //   }
    // };
    
    // THIS IS WHERE I ADDED THE ONSNAPSHOT TO GET REAL TIME UPDATES BUT IT'S MESSING UP THE REST OF THE CODE
    // WITH THIS MY MESSAGES DON'T EVEN DISPLAY AND FROM WHAT YOU CAN SEE FROM THE CONSOLE OTHER THINGS ARE GETTING AFFECTED
    // const getMessagesByChatId = (chatId) => {
    //   try {
    //     const messagesCollectionRef = collection(db, 'messages');
    //     const q = query(messagesCollectionRef, where('chatRoomId', '==', chatId));
    
    //     const realTimeMessages = onSnapshot(q, (snapshot) => {
    //       const messages = [];
    //       snapshot.forEach((doc) => {
    //         messages.push(doc.data());
    //       });
    //     });
        
    //     console.log(realTimeMessages,"real time messages here")
    //     return realTimeMessages;
    //   } catch (err) {
    //     console.log(err.message, "what is the error");
    //     error.value = err.message;
    //   }
    // };
    
   
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

       // Get specific chat by id
       const getChatData = async (chatId) => {
        try {
          const chatData = await getDoc(doc(db, "chat", chatId));
          if (chatData.exists) {
            return chatData.data();
          } else {
            console.log("No chat data available");
          }
        } catch (err) {
          console.log(err.message);
          error.value = err.message;
        }
      };

      // Delete chat by chatId
  const deleteChat = async (chatId) => {
    try {
      const chatDocRef = doc(db, "chat", chatId);
      await deleteDoc(chatDocRef);
      console.log("Chat deleted successfully");
      error.value = null;
    } catch (err) {
      console.log("Delete chat error", err.message);
      error.value = err.message;
    }
  };
  
  // Delete messages by chatRoomId
  const deleteMessages = async (chatId) => {
    try {
      const messagesCollectionRef = collection(db, "messages");
      const q = query(messagesCollectionRef, where("chatRoomId", "==", chatId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Messages deleted successfully");
      error.value = null;
    } catch (err) {
      console.log("Delete messages error", err.message);
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
      getChatData,
      deleteChat,
      deleteMessages,
    };
  };
  
  export default useDatabase;
