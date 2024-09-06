const backendUrl = {
  BACKEND_DEV_BASE_URL: "http://localhost:5000/api",
  BACKEND_PROD_BASE_URL:
    "https://car-rental-reservation-system-backend-three.vercel.app/api",
};

const baseUrl =
  process.env.NODE_ENV === "development"
    ? backendUrl.BACKEND_DEV_BASE_URL
    : backendUrl.BACKEND_PROD_BASE_URL;

import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl, // Use dynamic baseUrl
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await fetch(`${baseUrl}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["myBooking", "getAllBookings", "getAllCars", "getAllUsers"],
  endpoints: () => ({}),
});
