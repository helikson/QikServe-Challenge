export type CartItems = {
   itemID: number,
   modifierID: number,
   price: number,
   quantity: number,
}

export type CartStore = {
   cartItems: Array<CartItems>,
   setCartItems: (item: CartItems) => void,
   subtractItem: (item: CartItems) => void,
   addItem: (item: CartItems) => void,
   clearCartItems: () => void,
}