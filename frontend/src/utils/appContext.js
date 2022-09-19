import { createContext, useContext } from "react";

export const AppContext = createContext({
  accessToken: "",
  setAccessToken: (accessToken) => {},
  user: null,
  setUser: (user) => {},
});
export const useApp = () => useContext(AppContext);
