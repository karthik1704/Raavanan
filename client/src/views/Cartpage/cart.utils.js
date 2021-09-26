export const addItemToCart = (cartItems, cartItemToAdd) => {
  cartItemToAdd = {
    id: cartItemToAdd.id,
    price_id: cartItemToAdd.price,
    quantity: cartItemToAdd.quantity,
  };
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToAdd.id &&
      cartItem.price_id === cartItemToAdd.price_id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id &&
      cartItem.price_id === cartItemToAdd.price_id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  cartItemToRemove = {
    id: cartItemToRemove.id,
    price_id: cartItemToRemove.price,
    quantity: cartItemToRemove.quantity,
  };
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id === cartItemToRemove.id &&
      cartItem.price_id === cartItemToRemove.price_id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
