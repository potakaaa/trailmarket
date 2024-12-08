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
  setSelectedCategory: (value: string) => void;
  userArr: Record<string, any>;
  setUserArr: (value: Record<string, any>) => void;
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        selectedCategory,
        setSelectedCategory,
        userArr,
        setUserArr,
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
