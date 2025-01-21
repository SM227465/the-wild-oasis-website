'use client';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
