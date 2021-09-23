import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    firebase.auth.onAuthChanged((user) => {
      setCurrentUser(user);
      setloading(false);
    });
  }, []);
};
