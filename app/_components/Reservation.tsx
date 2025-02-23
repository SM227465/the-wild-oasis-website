import { ICabin } from '../_interfaces/cabin';
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';

interface Props {
  cabin: ICabin;
}

const Reservation = async (props: Props) => {
  const { cabin } = props;

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);

  console.log(bookedDates);

  return (
    <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
      <DateSelector
        bookedDates={bookedDates}
        cabin={cabin}
        settings={settings}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
