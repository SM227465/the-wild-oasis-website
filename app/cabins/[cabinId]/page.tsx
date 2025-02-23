import { Suspense } from 'react';
import Cabin from '../../_components/Cabin';
import Reservation from '../../_components/Reservation';
import Spinner from '../../_components/Spinner';
import { ICabin } from '../../_interfaces/cabin';
import { getCabin, getCabins } from '../../_lib/data-service';

interface Props {
  params: {
    cabinId: string;
  };
}

export const generateMetadata = async (props: Props) => {
  const { params } = props;
  const { cabinId } = params;
  const cabin: ICabin = await getCabin(Number(cabinId));

  return {
    title: `Cabin ${cabin.name}`,
  };
};

export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
};

const Page = async (props: Props) => {
  const { params } = props;
  const { cabinId } = params;

  const cabin = await getCabin(Number(cabinId));

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
