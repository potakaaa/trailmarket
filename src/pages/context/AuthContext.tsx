import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export interface Emp {
  id: number;
  name: string;
  age: number;
  pass: string | null;
  contact_num: number;
  email: string;
  role: string;
  emergency_contact: number;
  emergency_name: string;
  sss: number | null;
  philhealth: number | null;
  pagibig: number | null;
  tin: number | null;
  housenum: number | null;
  street: string | null;
  city: string;
}

export interface User {
  id: number;
  name: string;
  age: number;
  pass: string | null;
  contact_num: number;
  fb: string;
  email: string;
  image: string;
  prods: Prod[];
  isBanned: boolean;
}

export interface Prod {
  id: number;
  name: string;
  price: number;
  condition: string;
  category: string;
  seller: number;
  img: string | undefined;
  short_desc: string;
  desc: string;
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
  seller_id: number;
}

export interface Issue {
  id: number;
  title: string;
  desc: string;
  category: string;
  status: string;
  user: string;
  assigned: string;
}

export interface Tax {
  id: number;
  low: number;
  high: number;
  amount: number;
}

export interface FactCart {
  cartId: number;
  cartUser: number;
  cartProdId: number;
  cartMaxProdId: number | null;
}

export interface CheckoutProd {
  orderId: number | undefined;
  orderListId: number | undefined;
  prod_fk: number;
  meetupLoc: string | undefined;
  meetupDate: string | undefined;
  meetupTime: string | undefined;
  quantity: number;
  prodName: string;
  prodPrice: number;
  prodImg: string | undefined;
  paymentMethod: string | undefined;
  paymentDate: string | undefined;
  paymentStatus: string | undefined;
  sellerId: number;
}

export interface UserPayment {
  paymentMethod: string;
  paymentNumber: string;
}

// Define types for the context value
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (value: boolean) => void;
  selectedCategory: string;
  user: User | null;
  setUser: (user: User | null) => void;
  userList: User[];
  setUserList: (userList: User[]) => void;
  emp: Emp | null;
  setEmp: (emp: Emp | null) => void;
  empList: Emp[];
  setEmpList: (empList: Emp[]) => void;
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
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  taxes: Tax[];
  setTaxes: (taxes: Tax[]) => void;
  prodList: Prod[];
  setProdList: (prodList: Prod[]) => void;
  totalAmount: number;
  setTotalAmount: (value: number) => void;
  checkoutProd: CheckoutProd | null;
  setCheckoutProd: (value: CheckoutProd) => void;
  checkoutProds: CheckoutProd[];
  setCheckoutProds: (value: CheckoutProd[]) => void;
  userPayment: UserPayment[];
  setUserPayment: (value: UserPayment[]) => void;
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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const storedValueAdmin = localStorage.getItem("isAdminLoggedIn");
    return storedValueAdmin ? JSON.parse(storedValueAdmin) : false;
  });
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("isAdminLoggedIn", JSON.stringify(isAdminLoggedIn));
  }, [isLoggedIn, isAdminLoggedIn]);

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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [empList, setEmpList] = useState<Emp[]>([]);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [prodList, setProdList] = useState<Prod[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [checkoutProd, setCheckoutProd] = useState<CheckoutProd | null>(null);
  const [checkoutProds, setCheckoutProds] = useState<CheckoutProd[]>([]);
  const [userPayment, setUserPayment] = useState<UserPayment[]>([]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        selectedCategory,
        setSelectedCategory,
        user,
        setUser,
        userList,
        setUserList,
        emp,
        setEmp,
        empList,
        setEmpList,
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
        issues,
        setIssues,
        taxes,
        setTaxes,
        prodList,
        setProdList,
        totalAmount,
        setTotalAmount,
        checkoutProd,
        setCheckoutProd,
        checkoutProds,
        setCheckoutProds,
        userPayment,
        setUserPayment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
