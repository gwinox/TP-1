import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJ6yv5OKpznycT3drRH3vsFyxKpYOE3DQ",
    authDomain: "reactcr-7fdc0.firebaseapp.com",
    projectId: "reactcr-7fdc0",
    storageBucket: "reactcr-7fdc0.appspot.com",
    messagingSenderId: "386678730339",
    appId: "1:386678730339:web:5db982cdfcc55d16e1d256",
    measurementId: "G-7ZY8WXT43J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;