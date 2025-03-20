import { eachDayOfInterval } from 'date-fns';
import { notFound } from 'next/navigation';
import { ICountry } from '../_interfaces/country';
import { IGuest } from '../_interfaces/guest';
import supabase from './supabase';
import { IBooking, IBookingDetails } from '../_interfaces/booking';
import { ICabin } from '../_interfaces/cabin';

export const getCabin = async (id: number) => {
  const { data, error } = await supabase.from('cabins').select('*').eq('id', id).single();

  if (error) {
    notFound();
  }

  return data as ICabin;
};

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error('Unable to load cabin details!');
  }

  return data;
}

export const getCabins = async () => {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image, description')
    .order('name');

  if (error) {
    throw new Error('Cabins could not be loaded');
  }

  return data;
};

export const getGuest = async (email: string) => {
  const { data, error } = await supabase.from('guests').select('*').eq('email', email).single();

  return data as IGuest;
};

export const getBooking = async (id: number) => {
  const { data, error, count } = await supabase.from('bookings').select('*').eq('id', id).single();

  if (error) {
    throw new Error('Booking could not get loaded');
  }

  return data as IBooking;
};

export const getBookings = async (guestId: number) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numberOfNights, numberOfGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    throw new Error('Bookings could not get loaded');
  }

  return data as unknown as IBookingDetails[];
};

export const getBookedDatesByCabinId = async (cabinId: number) => {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISOString: string = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${todayISOString},status.eq.checked-in`);

  if (error) {
    throw new Error('Bookings could not get loaded');
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
};

export const getSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    throw new Error('Settings could not be loaded');
  }

  return data;
};

export async function getCountries() {
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
    const countries = (await res.json()) as ICountry[];
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

export const createGuest = async (newGuest: any) => {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    throw new Error('Guest could not be created');
  }

  return data;
};
