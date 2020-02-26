import React, { createContext, useReducer, useEffect } from "react";
// import { useLazyQuery } from "@apollo/react-hooks";
// import Cookies from 'react-cookies'
import rootReducer from "./reducers";
import * as actionsForm from "./actions";
import actionsCreator from "../../utils/actionsCreator";

export interface UserContextType {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  actions: {
    setUser({ sessionId, accessLevels }: { sessionId: string; accessLevels: [] }): void;
    logout(): void;
  };
}

const initialState: UserContextType = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  actions: {
    setUser: () => null,
    logout: () => null
  }
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const actions = actionsCreator(actionsForm, dispatch);
  const getInitialValues = async () => {
    // await actions.setUser({ ...user, timezone, language });
  };
  useEffect(() => {
    getInitialValues();
  }, []);
  return <UserContext.Provider value={{ ...state, actions }}>{children}</UserContext.Provider>;
};
