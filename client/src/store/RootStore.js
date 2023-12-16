import { useContext, createContext } from "react";
import UserStore from "./UserStore";

export default class RootStore {
    user = new UserStore()
}

export const Context = createContext(null)

export const useStore = () => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(
        "You have forgotten to wrap your root component with RootStoreProvider"
      );
    }
    return context;
}