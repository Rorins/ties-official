import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDTvtOpgxhLutDo_Cc1EBpplvwR1dUKglk",
    authDomain: "ties-57e6d.firebaseapp.com",
    projectId: "ties-57e6d",
    storageBucket: "ties-57e6d.appspot.com",
    messagingSenderId: "151804178297",
    appId: "1:151804178297:web:2174cc7c2219c882a989a8",
    measurementId: "G-2V5WBCFQRP"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }

export default app