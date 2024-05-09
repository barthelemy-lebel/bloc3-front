import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/storage';

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9NZnqjZKVa9CylSgj1Ho7fgqXe67iTWE",
  authDomain: "meet-imo.firebaseapp.com",
  projectId: "meet-imo",
  storageBucket: "meet-imo.appspot.com",
  messagingSenderId: "718246296158",
  appId: "1:718246296158:web:beb9d5d5895e1a1f8252cf",
  measurementId: "G-QP6XC8J2Z6"
};

// Initialisez Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const storage = firebase.storage();

// Sélectionnez l'élément de fichier
const fileInput = document.getElementById('dropzone-file');
console.log(fileInput);

// Ajoutez un gestionnaire d'événements pour l'événement "change"
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const storageRef = firebase.storage.ref(); // Utilisez storage.ref() pour obtenir une référence au service de stockage
  const uploadTask = storageRef.child(file.name).put(file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      console.log(snapshot);
    },
    (error) => {
      console.error(error);
    },
    () => {
      console.log("Success uploader");
    }
  );
});
