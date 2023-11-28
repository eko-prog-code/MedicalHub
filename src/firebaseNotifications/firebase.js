import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyAEqwh3TdjKpZdpBLVzzuaHLqu214ltdfE",

    authDomain: "medicalhub-2023.firebaseapp.com",
  
    databaseURL: "https://medicalhub-2023-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "medicalhub-2023",
  
    storageBucket: "medicalhub-2023.appspot.com",
  
    messagingSenderId: "510576093403",
  
    appId: "1:510576093403:web:2cd7c3bbf93748e4d2c4fe"
  
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BGxhoB8k28HbGzO6MtjUc8rN0FX6GTe-I9M_pwiupyvk488dF3Jbgr7XNB2roiGXvCqWdSvGb17N7iVO6DX-yk4` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {    
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });