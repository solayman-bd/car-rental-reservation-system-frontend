import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User and Car interfaces
interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
}

export interface ICar {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  basicFeatures: string[];
  additionalFeatures: {
    name: string;
    feePerHour: number;
  }[];
  pricePerHour: number;
  isDeleted: boolean;
  status: "available" | "unavailable";
  isCurrentlyHired: boolean;
  locationWhereAvailable: string[];
  img: string[];
}
// Define the Booking interface
export interface IBooking {
  _id: string;
  carId: string;
  hiringDate: string;
  returningDate: string | null;
  startTime: string;
  endTime: string | null;
  user: IUser;
  car: ICar;
  totalCost: number;
  status: string;
  additionalFeatures: string[];
  startLocation: string;
}

// Define the BookingState interface
interface IBookingState {
  bookings: IBooking[] | null;
}

// Initialize the state
const initialState: IBookingState = {
  bookings: null,
};

// Create the slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<IBooking[]>) => {
      state.bookings = action.payload;
    },
  },
});

// Export the actions
export const { setBookings } = bookingSlice.actions;

// Export the reducer
export default bookingSlice.reducer;
