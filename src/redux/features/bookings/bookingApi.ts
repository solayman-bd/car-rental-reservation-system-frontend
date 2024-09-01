import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/my-bookings",
          method: "GET",
        };
      },
      providesTags: ["myBooking"],
    }),
    updateBooking: builder.mutation({
      query: ({ updateInfo, bookingId }) => ({
        url: `/bookings/update-booking/${bookingId}`,
        method: "POST",
        body: updateInfo,
      }),
      invalidatesTags: ["myBooking"],
    }),
  }),
});

export const { useGetMyBookingsQuery, useUpdateBookingMutation } = bookingApi;
