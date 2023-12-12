import { useContext, createContext } from "react";
import UserStore from "./UserStore";
import DeviceStore from "./DeviceStore";
import BasketStore from "./BasketStore";

export default class RootStore {
    user = new UserStore()
    device = new DeviceStore()
    basket = new BasketStore()
}

export const Context = createContext<RootStore | null>(null)

export const useStore = () => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(
        "You have forgotten to wrap your root component with RootStoreProvider"
      );
    }
    return context;
}