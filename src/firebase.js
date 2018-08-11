import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAiaPS4wpcEVqI7uIL0HsQmeBIP_cgneLA",
    authDomain: "linkedin-just-search.firebaseapp.com",
    databaseURL: "https://linkedin-just-search.firebaseio.com",
    projectId: "linkedin-just-search",
    storageBucket: "linkedin-just-search.appspot.com",
    messagingSenderId: "683292119421"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseData = firebase.database();
export const filterDataForUpdate = firebase.database().ref();