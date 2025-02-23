import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

interface Props {
  defaultCountry: string;
  name: string;
  id: any;
  className: string;
}

const SelectCountry = async (props: Props) => {
  const { className, defaultCountry, id, name } = props;

  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  console.log({ flag });

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value='' disabled>
        Select country...
      </option>
      {countries.map((country) => (
        <option key={country.name} value={`${country.name}%${country.flag}`}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default SelectCountry;
