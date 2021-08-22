import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDUdLt0hlSycgcdVIUtF22_7W5s95YnfAM",
  authDomain: "louvor-arq.firebaseapp.com",
  projectId: "louvor-arq",
  storageBucket: "louvor-arq.appspot.com",
  messagingSenderId: "878187098169",
  appId: "1:878187098169:web:af82c40a49a3b3e1e41de8",
};

let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
