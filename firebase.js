import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyDy9TXbr_8uw-Bv79tpQqXrdY8dYWQyRdM",
    authDomain: "crud-todo-app-9784f.firebaseapp.com",
    databaseURL: "https://crud-todo-app-9784f-default-rtdb.firebaseio.com",
    projectId: "crud-todo-app-9784f",
    storageBucket: "crud-todo-app-9784f.firebasestorage.app",
    messagingSenderId: "623676150880",
    appId: "1:623676150880:web:f403777df40f2dda0e5f05",
    measurementId: "G-ZF66D2RYJV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
