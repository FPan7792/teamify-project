import React from "react";
import ReactDOM from "react-dom";
import "./output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEDwH7u37dAQyrxXCya-atX3qRpdZ10to",
  authDomain: "teamify-me.firebaseapp.com",
  projectId: "teamify-me",
  storageBucket: "teamify-me.appspot.com",
  messagingSenderId: "840810885335",
  appId: "1:840810885335:web:2365f32fa2dd2ee7560092",
  measurementId: "G-VY501H3Q4P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
