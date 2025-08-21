import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5H8NA6d71Xk9lqaOPaHDJa_SA8dW0T2I",
  authDomain: "todo-app-39572.firebaseapp.com",
  projectId: "todo-app-39572",
  storageBucket: "todo-app-39572.firebasestorage.app",
  messagingSenderId: "103193851776",
  appId: "1:103193851776:web:09b7f44748d41dfad4b365",
  measurementId: "G-KR8TPLDVZG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;