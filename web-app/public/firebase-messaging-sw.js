importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

function initInSw() {
    firebase.initializeApp({
        apiKey: "AIzaSyBd7hZq1G1oSvX0cVEErbexampleo",
        authDomain: "web-push-324b8.firebaseapp.com",
        projectId: "web-push-324b8",
        storageBucket: "web-push-324b8.appspot.com",
        messagingSenderId: "59950797055",
        appId: "1:59950797055:web:1774e34283734434234d6d"
    });

    const messaging = firebase.messaging();

    // onBackgroundMessage();
}

function onBackgroundMessage() {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
        console.log(
            '[firebase-messaging-sw.js] Received background message ',
            payload
        );

        if ("setAppBadge" in navigator) {
            navigator.setAppBadge(payload.apns.payload.aps.notification_count);
        }

        const notificationTitle = 'Background Message Title';
        const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png'
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
}

initInSw();