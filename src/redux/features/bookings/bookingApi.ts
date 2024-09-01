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
    bookACar: builder.mutation({
      query: (bookingInfo) => ({
        url: `/bookings`,
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["myBooking"],
    }),
    changeBookingStatus: builder.mutation({
      query: (bookingInfo) => ({
        url: `/bookings/change-booking-status`,
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["myBooking"],
    }),
    getAllBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/get-all-bookings",
          method: "GET",
        };
      },
      providesTags: ["getAllBookings"],
    }),
  }),
});

export const {
  useGetMyBookingsQuery,
  useUpdateBookingMutation,
  useBookACarMutation,
  useChangeBookingStatusMutation,
  useGetAllBookingsQuery,
} = bookingApi;
