import React, { createContext, useReducer, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import Cookies from 'js-cookie'
import rootReducer from "./reducers";
import * as actionsForm from "./actions";
import actionsCreator from "../../utils/actionsCreator";
import { LOGGED_IN } from "./index.graphql";

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
  const token = Cookies.get('token')
  const { data } = useQuery(LOGGED_IN)
  const actions = actionsCreator(actionsForm, dispatch);
  const getInitialValues = async () => {
    if(data && data.loggedIn) await actions.setUser({ ...data.loggedIn });
  };
  useEffect(() => {
    getInitialValues();
  }, [data]);
  return <UserContext.Provider value={{ ...state, actions }}>{children}</UserContext.Provider>;
};
