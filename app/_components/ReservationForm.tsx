'use client';

import { type User } from 'next-auth';
import { ICabin } from '../_interfaces/cabin';
import { useReservation } from './ReservationContext';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import { createBooking } from '../_lib/actions';
import SubmitButton from './SubmitButton';

interface Props {
  cabin: ICabin;
  user: User;
}

const ReservationForm = (props: Props) => {
  const { cabin, user } = props;
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { range, resetRange } = useReservation();

  const startDate = range?.from || null;
  const endDate = range?.to || null;
  const numberOfNights = startDate && endDate ? differenceInDays(endDate, startDate) : null;
  const cabinPrice = numberOfNights ? numberOfNights * (regularPrice - discount) : null;

  const handleSubmit = async (formData: FormData) => {
    if (startDate && endDate) {
      formData.append('startDate', startDate.toISOString());
      formData.append('endDate', endDate.toISOString());
      formData.append('numberOfNights', String(numberOfNights));
      formData.append('cabinPrice', String(cabinPrice));
      formData.append('cabinId', id);
    }

    try {
      await createBooking(formData);
      resetRange();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const canSubmit = Boolean(startDate && endDate && numberOfNights && numberOfNights > 0);

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <Image
            src={user.image!}
            alt={user.name!}
            className='h-8 rounded-full'
            height={32}
            width={32}
            referrerPolicy='no-referrer'
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
        action={handleSubmit}
      >
        <div className='space-y-2'>
          <label htmlFor='numberOfGuests'>How many guests?</label>
          <select
            name='numberOfGuests'
            id='numberOfGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>Anything we should know about your stay?</label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!canSubmit && <p className='text-primary-300 text-base'>Start by selecting dates</p>}
          {canSubmit && (
            <p className='text-primary-300 text-base'>
              {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'} · ${cabinPrice}
            </p>
          )}

          <SubmitButton pendingLabel='Reserving...' isDisable={!canSubmit}>
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
