import { createContext, useState, useEffect } from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
