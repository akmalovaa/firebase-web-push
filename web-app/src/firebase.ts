import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBd7hZq1G1oSvX0cVEErbexampleo",
    authDomain: "web-push-324b8.firebaseapp.com",
    projectId: "web-push-324b8",
    storageBucket: "web-push-324b8.appspot.com",
    messagingSenderId: "59950797055",
    appId: "1:59950797055:web:174444444bd51e87d6d"
});

export const messaging = getMessaging(firebaseApp);

export const generateToken = async (): Promise<string> => {
    let token;
    const maxAttempts = 3;
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Successfully granted...");
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                token = await getToken(messaging, {
                    vapidKey: "BDYKvTTjPSb-vapidKeyETOwebCertificateIsFirebaseConsloli",
                });
                console.log(token);
                break;
            } catch (error) {
                console.error("Error in getting token:", error);
                if (attempt === maxAttempts - 1) {
                    return "Error after 3 attempts";
                }
            }
        }
    }

    return token || "Not permission";
}
