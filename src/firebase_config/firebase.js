// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTSzd1gebOhVcb_iyj8VqLSXf7c0T0QmI",
  authDomain: "sgvp-collage-erp.firebaseapp.com",
  projectId: "sgvp-collage-erp",
  storageBucket: "sgvp-collage-erp.appspot.com",
  messagingSenderId: "306045411251",
  appId: "1:306045411251:web:56cfed4f6d12547d8d35c6",
  measurementId: "G-D6VYTN28ZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);
