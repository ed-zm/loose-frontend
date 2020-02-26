import React from "react";
import { UserProvider } from "./User";

export default ({ children }) => (
  <UserProvider>
    {children}
  </UserProvider>
);
