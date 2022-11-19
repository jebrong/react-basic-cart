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
  useEffect((arg) => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispense({ type: "LOADING" });
    const response = await fetch(url);
    const data = await response.json();

    dispense({ type: "DISPLAY_ITEMS", payload: data });
  };

  const addItem = (id) => {
    dispense({ type: "ADD", payload: id });
  };

  const removeItem = (id) => {
    dispense({ type: "REMOVE", payload: id });
  };

  const clearItems = () => {
    dispense({ type: "CLEAR" });
  };

  const combineTotalItems = () => {
    dispense({ type: "TOTAL" });
  };

  const changeAmount = (id, type) => {
    dispense({ type: "CHANGE_AMOUNT", payload: { id, type } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearItems,
        combineTotalItems,
        changeAmount,
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
