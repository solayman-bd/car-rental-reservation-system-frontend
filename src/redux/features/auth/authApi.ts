import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (userInfo) => {
        console.log(userInfo);
        return {
          url: "/auth/signin",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/update-user",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useUpdateUserMutation } =
  authApi;
