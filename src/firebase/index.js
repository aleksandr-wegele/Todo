import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDO7OTJzsbM7_VQX41BZrfl6oRX73dfbps",
  authDomain: "todo-797fe.firebaseapp.com",
  projectId: "todo-797fe",
  storageBucket: "todo-797fe.appspot.com",
  messagingSenderId: "984216728836",
  appId: "1:984216728836:web:3ab9a19978313d46e64c51"
  }

firebase.initializeApp(firebaseConfig)

export default firebase