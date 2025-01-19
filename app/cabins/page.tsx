import React from 'react';
import Counter from '../components/Counter';

const Page = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  // console.log(data);

  return (
    <div>
      <h1>Cabins page</h1>

      <ul>
        {data.map((user: any) => (
          <li key={user.id}> {user.name} </li>
        ))}
      </ul>

      <Counter />
    </div>
  );
};

export default Page;
