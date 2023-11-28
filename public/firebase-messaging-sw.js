importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyAEqwh3TdjKpZdpBLVzzuaHLqu214ltdfE",

    authDomain: "medicalhub-2023.firebaseapp.com",
  
    databaseURL: "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "medicalhub-2023",
  
    storageBucket: "medicalhub-2023.appspot.com",
  
    messagingSenderId: "510576093403",
  
    appId: "1:510576093403:web:2cd7c3bbf93748e4d2c4fe"
  
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});