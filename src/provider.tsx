import React, { memo, ReactNode, useEffect, useState } from "react";
import { Provider } from "./context";

type Props = {
  children: ReactNode;
  storage?: any; // localStorage or AsyncStorage
};

const initialState = {
  auth: ""
};

const AuthProvider = ({ children, storage }: Props) => {
  const [auth, setAuth] = useState({ auth: "" });
  // initial Effect to set Auth if exists
  useEffect(() => {
    const getState = async (storage: any) => {
      if (!auth) {
        if (!storage) {
          console.warn("AuthProvider: Storage is not provided");
          return setAuth(initialState);
        }
        // return default value if storage is not valid
        if (!storage.getItem) {
          console.warn(
            "AuthProvider: getItem does not exist in provided storage"
          );
          return setAuth(initialState);
        }
        try {
          const state = await storage.getItem("authToken");
          if (!state) return setAuth(initialState);
          return setAuth(state);
        } catch (error) {
          console.warn(`AuthProvider: ${error.message}`);
          return setAuth(initialState);
        }
      }
    };
    getState(storage);
  }, [storage]);

  // effect to save item to storage
  useEffect(() => {
    if (!storage) {
      console.warn("AuthProvider: Storage is not provided");
      return;
    }
    if (!storage.setItem) {
      console.warn("AuthProvider: setItem does not exist in provided storage");
      return;
    }
    storage.setItem("authToken", auth);
  }, [auth]);
  return <Provider value={auth}>{children}</Provider>;
};

export default memo<Props>(AuthProvider);
