import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance";
interface userInterface {
  active: boolean;
  name: string;
  cart: any;
}
interface authContextInterface {
  user: userInterface;
  setUser: (user: any) => any;
}
const authContext = createContext<authContextInterface>(null!);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const userInitial = {
    active: false,
    name: "",
    cart: null,
  };
  const [user, setUser] = useState<typeof userInitial>(userInitial);
  useEffect(() => {
    console.log("running useeffect in authcontext");
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/me");
        setUser({
          active: true,
          name: response.data.user.name,
          cart: response.data.cart,
        });
        // console.log("on context, current user:", response.data);
      } catch (error: any) {
        setUser({ active: false, name: "", cart: null });
        // console.log("context error", error.response.data.message);
      }
    }
    fetchData();
  }, []);

  const values = { user, setUser };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}

export default authContext;
