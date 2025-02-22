import { ICabin } from '../_interfaces/cabin';
import { getCabins } from '../_lib/data-service';
import CabinCard from './CabinCard';

interface Props {
  filter: string;
}

const CabinList = async (props: Props) => {
  const { filter } = props;
  // noStore();

  const cabins: ICabin[] = await getCabins();

  if (!cabins.length) {
    return null;
  }

  let filtredCabins;

  if (filter === 'all') {
    filtredCabins = cabins;
  }

  if (filter === 'small') {
    filtredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  if (filter === 'medium') {
    filtredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }

  if (filter === 'large') {
    filtredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {filtredCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
