import React, { useState, useContext, useEffect } from "react";
import { googleProvider, auth, db } from "../firebase";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function signInWithGoogle() {
    return auth.signInWithPopup(googleProvider);
  }

  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function updateProfile(name, photo) {
    return currentUser.updateProfile({
      displayName: name,
      photoURL: photo,
    });
  }
  function writeUserData(user) {
    return {
      uid: user.uid,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user !== null) {
        user.providerData.forEach((profile) => {
          if (profile.providerId === "google.com") {
            db.createUser(user.uid, {
              uid: user.uid,
              name: profile.displayName,
              photoUrl: profile.photoURL,
            });
          }
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    writeUserData,
    login,
    signInWithGoogle,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateProfile,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
