import React, { useEffect, useState } from "react";
import firebase from "firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((_user) => {
      console.log(_user);
      if (_user) {
        setUser(_user.providerData[0]);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
