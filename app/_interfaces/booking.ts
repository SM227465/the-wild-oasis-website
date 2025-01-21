export interface IBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numberOfNights: number;
  numberOfGuests: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  totalPrice: number;
  cabins: {
    name: string;
  };
  guests: {
    email: string;
    fullName: string;
  };
}

export interface IBookingDetails {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numberOfNights: number;
  numberOfGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string; // This field is optional
  cabinId: number;
  guestId: number;
  cabins: {
    id: number;
    name: string;
    image: string;
    discount: number;
    created_at: string;
    description: string;
    maxCapacity: number;
    regularPrice: number;
  };
  guests: {
    id: number;
    email: string;
    fullName: string;
    lastName?: string; // These fields are optional
    firstName?: string;
    created_at: string;
    nationalId: string;
    countryFlag: string;
    nationality: string;
  };
}

export type BookingSortField = keyof IBooking;
