import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import { reducer } from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispense] = useReducer(reducer, initialState);

  useEffect(
    (arg) => {
      combineTotalItems();
    },
    [state.cart]
  );

  const addItem = (id) => {
    return dispense({ type: "ADD", payload: id });
  };

  const removeItem = (id) => {
    return dispense({ type: "REMOVE", payload: id });
  };

  const clearItems = () => {
    return dispense({ type: "CLEAR" });
  };

  const combineTotalItems = () => {
    return dispense({ type: "TOTAL" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearItems,
        combineTotalItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
