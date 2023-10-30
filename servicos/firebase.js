// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1fuU1lhAzFRGoqR-6qkqxqWmhH_--fRE",
  authDomain: "myphotos2-b14c5.firebaseapp.com",
  databaseURL: "https://myphotos2-b14c5-default-rtdb.firebaseio.com/",
  projectId: "myphotos2-b14c5",
  storageBucket: "myphotos2-b14c5.appspot.com",
  messagingSenderId: "678857873536",
  appId: "1:678857873536:web:70f4c4afb1f8b20fd86e65",
  measurementId: "G-DK06H2D29S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app