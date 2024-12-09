import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface Emp {
  id: number;
  name: string;
  age: number;
  pass: string;
  contact_num: number;
  email: string;
  role: string;
  emergency_contact: number;
  emergency_name: string;
  sss: number;
  philhealkh: number;
  pagibig: number;
  tin: number;
  housenum: number;
  street: string;
  city: string;
}
interface User {
  id: string;
  name: string;
  age: number;
  pass: string;
  contact_num: number;
  fb: string;
  email: string;
  image: string;
}

export interface CartProd {
  prod_id: number;
  name: string;
  price: number;
  condition: string;
  category: string;
  seller: string;
  img: string | undefined;
  quantity: number;
}

// Define types for the context value
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  selectedCategory: string;
  user: User | null;
  setUser: (user: User | null) => void;
  emp: Emp | null;
  setEmp: (emp: Emp | null) => void;
  setSelectedCategory: (value: string) => void;
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
  cartProd: CartProd | null;
  setCartProd: (cartProd: CartProd | null) => void;
  cart: CartProd[];
  setCart: (cart: CartProd[]) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  searchState: string;
  setSearchState: (value: string) => void;
  isCodeSent: boolean;
  setIsCodeSent: (value: boolean) => void;
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

  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [emp, setEmp] = useState<Emp | null>(() => {
    const storedEmp = localStorage.getItem("user");
    return storedEmp ? JSON.parse(storedEmp) : null;
  });
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [cartProd, setCartProd] = useState<CartProd | null>(null);
  const [cart, setCart] = useState<CartProd[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        selectedCategory,
        setSelectedCategory,
        user,
        setUser,
        emp,
        setEmp,
        isFetched,
        setIsFetched,
        cartProd,
        setCartProd,
        cart,
        setCart,
        isLoading,
        setIsLoading,
        searchState,
        setSearchState,
        isCodeSent,
        setIsCodeSent,
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
