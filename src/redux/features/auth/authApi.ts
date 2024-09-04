import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (userInfo) => {
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
      invalidatesTags: ["getAllUsers"],
    }),
    updateAUserByAdmin: builder.mutation({
      query: ({ userId, userInfo }) => ({
        url: `/auth/update-user-by-admin/${userId}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["getAllUsers"],
    }),
    deleteAUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/delete-a-user`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["getAllUsers"],
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/auth/all-users`,
          method: "GET",
        };
      },
      providesTags: ["getAllUsers"],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useDeleteAUserMutation,
  useGetAllUsersQuery,
  useUpdateAUserByAdminMutation,
} = authApi;
