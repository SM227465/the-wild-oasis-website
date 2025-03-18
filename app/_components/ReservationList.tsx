'use client';

import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { type IBookingDetails } from '../_interfaces/booking';
import { deleteReservation } from '../_lib/actions';

interface Props {
  bookings: IBookingDetails[];
}

const ReservationList = (props: Props) => {
  const { bookings } = props;

  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handleDeleteReservation = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDeleteReservation} />
      ))}
    </ul>
  );
};

export default ReservationList;
