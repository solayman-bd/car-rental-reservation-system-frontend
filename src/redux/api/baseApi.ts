// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const backendUrl = {
  BACKEND_DEV_BASE_URL: "http://localhost:5000/api",
  BACKEND_PROD_BASE_URL: "https://campers-shop-backend.onrender.com/api",
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl.BACKEND_PROD_BASE_URL }),
  tagTypes: [
    "AllProduct",
    "AllCategory",
    "BestSellingProduct",
    "SingleProduct",
    "DeleteASingleProduct",
  ],
  endpoints: () => ({}),
});
