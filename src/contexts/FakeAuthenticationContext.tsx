import { createContext, useContext, useReducer } from "react";
import type {
  AuthContextTypes,
  ReducerAction,
  ReducerStates,
} from "../types/type";

const AuthContext = createContext<AuthContextTypes | null>(null);

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
  error: ""
};

const reducer = (state: ReducerStates, action: ReducerAction) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "error":
        return {
            ...state,
            error: "Invalid username or password"
        }
    default:
      return state;
  }
};

function FakeAuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }else {
        dispatch({type: "error"})
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context used outside provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { FakeAuthenticationProvider, useAuth };
