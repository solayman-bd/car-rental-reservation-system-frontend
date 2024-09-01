import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => {
        return {
          url: "/cars",
          method: "GET",
        };
      },
      providesTags: ["getAllCars"],
    }),
    getASingleCar: builder.query({
      query: (carId) => {
        return {
          url: `/cars/${carId}`,
          method: "GET",
        };
      },
      providesTags: [],
    }),
    updateACar: builder.mutation({
      query: ({ updateInfo, carId }) => ({
        url: `/cars/${carId}`,
        method: "PUT",
        body: updateInfo,
      }),
      invalidatesTags: [],
    }),
    createACar: builder.mutation({
      query: (carInfo) => ({
        url: `/cars`,
        method: "POST",
        body: carInfo,
      }),
      invalidatesTags: [],
    }),
    returnTheCar: builder.mutation({
      query: (carInfo) => ({
        url: `cars/return`,
        method: "PUT",
        body: carInfo,
      }),
      invalidatesTags: [],
    }),
    deleteACar: builder.mutation({
      query: (carId) => ({
        url: `cars/${carId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getAllCars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useUpdateACarMutation,
  useCreateACarMutation,
  useDeleteACarMutation,
  useGetASingleCarQuery,
  useReturnTheCarMutation,
} = carApi;
