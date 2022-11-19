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
};
