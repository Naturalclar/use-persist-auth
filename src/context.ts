import { useContext, createContext } from "react";

type Context = {
  auth: string;
};

const AuthContext = createContext<Context>({
  auth: ""
});

export const useAuth = () => useContext(AuthContext);

export const { Provider, Consumer } = AuthContext;
