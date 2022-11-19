export const reducer = (state, action) => {
  if (action.type === "ADD") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: ++cartItem.amount };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === "REMOVE") {
    let tempCart = state.cart;

    tempCart = tempCart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: --cartItem.amount };
        }

        return cartItem;
      })
      .filter((item) => {
        return item.amount !== 0;
      });

    return { ...state, cart: tempCart };
  }
  if (action.type === "CLEAR") {
    return { ...state, cart: [] };
  }
  if (action.type === "TOTAL") {
    const overAllTotals = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        let totalPer = amount * price;

        total.allCash += totalPer;
        total.allItems += amount;

        return total;
      },
      {
        allCash: 0,
        allItems: 0,
      }
    );

    return {
      ...state,
      amount: overAllTotals.allCash,
      total: overAllTotals.allItems,
    };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  if (action.type === "CHANGE_AMOUNT") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === "add") {
            return { ...item, amount: item.amount + 1 };
          }
          if (action.payload.type === "minus") {
            return { ...item, amount: item.amount - 1 };
          }
        }

        return item;
      })
      .filter((arg) => {
        return arg.amount !== 0;
      });

    return { ...state, cart: tempCart };
  }
  throw new Error("NO ACTION TYPE MATCH!!");
};
