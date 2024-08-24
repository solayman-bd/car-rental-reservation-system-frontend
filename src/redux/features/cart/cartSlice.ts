// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import { IProduct } from "../../../components/ProductCard";

// interface ICartItem extends IProduct {
//   cartQuantity: number;
// }

// interface ICartState {
//   cartItems: ICartItem[];
//   cartTotalQuantity: number;
//   cartTotalAmount: number;
// }

// // Function to calculate totals from cart items
// const calculateTotals = (cartItems: ICartItem[]) => {
//   const { total, quantity } = cartItems.reduce(
//     (cartTotal, cartItem) => {
//       const itemTotal = cartItem.price * cartItem.cartQuantity;
//       cartTotal.total += itemTotal;
//       cartTotal.quantity += cartItem.cartQuantity;
//       return cartTotal;
//     },
//     {
//       total: 0,
//       quantity: 0,
//     }
//   );
//   return {
//     totalAmount: parseFloat(total.toFixed(2)),
//     totalQuantity: quantity,
//   };
// };

// // Initialize cart state with items from localStorage
// const initialState: ICartState = (() => {
//   const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
//   const totals = calculateTotals(cartItems);
//   return {
//     cartItems,
//     cartTotalQuantity: totals.totalQuantity,
//     cartTotalAmount: totals.totalAmount,
//   };
// })();

// // Create cart slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<IProduct>) {
//       const existingIndex = state.cartItems.findIndex(
//         (item) => item._id === action.payload._id
//       );

//       if (existingIndex >= 0) {
//         if (
//           state.cartItems[existingIndex].cartQuantity < action.payload.stock
//         ) {
//           state.cartItems[existingIndex].cartQuantity += 1;
//           toast.info("Increased product quantity", { position: "bottom-left" });
//         }
//       } else {
//         state.cartItems.push({ ...action.payload, cartQuantity: 1 });
//         toast.success("Product added to cart", { position: "bottom-left" });
//       }
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     decreaseCart(state, action: PayloadAction<IProduct>) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item._id === action.payload._id
//       );

//       if (state.cartItems[itemIndex].cartQuantity > 1) {
//         state.cartItems[itemIndex].cartQuantity -= 1;
//         toast.info("Decreased product quantity", { position: "bottom-left" });
//       } else {
//         state.cartItems.splice(itemIndex, 1);
//         toast.error("Product removed from cart", { position: "bottom-left" });
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     increaseCartByValue(
//       state,
//       action: PayloadAction<{ product: IProduct; value: number }>
//     ) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item._id === action.payload.product._id
//       );

//       const newQuantity =
//         state.cartItems[itemIndex].cartQuantity + action.payload.value;
//       if (newQuantity <= state.cartItems[itemIndex].stock) {
//         state.cartItems[itemIndex].cartQuantity = newQuantity;
//         toast.info(`Increased product quantity by ${action.payload.value}`, {
//           position: "bottom-left",
//         });
//       } else {
//         toast.error(
//           `You can not increase the value by ${action.payload.value} because we have only stock ${state.cartItems[itemIndex].stock}`,
//           { position: "bottom-left" }
//         );
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     decreaseCartByValue(
//       state,
//       action: PayloadAction<{ product: IProduct; value: number }>
//     ) {
//       const itemIndex = state.cartItems.findIndex(
//         (item) => item._id === action.payload.product._id
//       );

//       const newQuantity =
//         state.cartItems[itemIndex].cartQuantity - action.payload.value;
//       if (newQuantity >= 0) {
//         state.cartItems[itemIndex].cartQuantity = newQuantity;
//         toast.info(`Decreased product quantity by ${action.payload.value}`, {
//           position: "bottom-left",
//         });
//         if (newQuantity === 0) {
//           state.cartItems.splice(itemIndex, 1);
//         }
//       } else {
//         toast.error(
//           `You can not decrease the value by ${action.payload.value} because we have current quantity ${state.cartItems[itemIndex].cartQuantity}`,
//           { position: "bottom-left" }
//         );
//       }

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     removeFromCart(state, action: PayloadAction<IProduct>) {
//       state.cartItems = state.cartItems.filter(
//         (cartItem) => cartItem._id !== action.payload._id
//       );

//       toast.error("Product removed from cart", { position: "bottom-left" });

//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     getTotals(state) {
//       const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
//       state.cartTotalAmount = totalAmount;
//       state.cartTotalQuantity = totalQuantity;
//     },
//     clearCart(state) {
//       state.cartItems = [];
//       localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//       toast.error("Cart cleared", { position: "bottom-left" });
//       state.cartTotalAmount = 0;
//       state.cartTotalQuantity = 0;
//     },
//   },
// });

// export const {
//   addToCart,
//   decreaseCart,
//   removeFromCart,
//   getTotals,
//   clearCart,
//   increaseCartByValue,
//   decreaseCartByValue,
// } = cartSlice.actions;

// export default cartSlice.reducer;
