'use client';

import { differenceInDays, isPast, isSameDay, isWithinInterval } from 'date-fns';
import { type DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ICabin } from '../_interfaces/cabin';
import { ISetting } from '../_interfaces/setting';
import { useReservation } from './ReservationContext';

const isAlreadyBooked = (range: DateRange, datesArr: Date[]): boolean => {
  if (!range.from || !range.to) {
    return false; // Return false if either is undefined
  }

  return datesArr.some((date: Date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! })
  );
};

interface Props {
  settings: ISetting;
  bookedDates: Date[];
  cabin: ICabin;
}

const DateSelector = (props: Props) => {
  const { bookedDates, cabin, settings } = props;
  const { range, setRange, resetRange } = useReservation();
  const { discount, regularPrice } = cabin;
  const { maxBookingLength, minBookingLength } = settings;

  let numberOfNights: number | null = null;
  let cabinPrice: number | null = null;
  let displayRange: DateRange | null = null;

  if (range) {
    displayRange = isAlreadyBooked(range, bookedDates) ? null : range;

    if (displayRange && displayRange.to && displayRange.from) {
      numberOfNights = differenceInDays(displayRange.to, displayRange.from);
      cabinPrice = numberOfNights * (regularPrice - discount);
    }
  }

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='pt-12 place-self-center'
        mode='range'
        onSelect={setRange}
        selected={displayRange || undefined}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout='dropdown'
        numberOfMonths={2}
        disabled={(currentDate) =>
          isPast(currentDate) || bookedDates?.some((date) => isSameDay(date, currentDate))
        }
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>${regularPrice}</span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numberOfNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numberOfNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer'
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DateSelector;
