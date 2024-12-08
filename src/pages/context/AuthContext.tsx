import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

// Define types for the context value
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  selectedCategory: string;
  user: User | null;
  setUser: (user: User | null) => void;
  setSelectedCategory: (value: string) => void;
<<<<<<< HEAD
  userArr: Record<string, any>;
  setUserArr: (value: Record<string, any>) => void;
=======
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
>>>>>>> a32408b65886f6892f2a43d9260707eae2a77f0c
}

interface User {
  id: string;
  name: string;
}
// Create the context with a default value of `undefined`
// We later provide the context in the `AuthProvider`
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [userArr, setUserArr] = useState<Record<string, any>>({});

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        selectedCategory,
        setSelectedCategory,
<<<<<<< HEAD
        userArr,
        setUserArr,
=======
        user,
        setUser,
        isFetched,
        setIsFetched,
>>>>>>> a32408b65886f6892f2a43d9260707eae2a77f0c
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
