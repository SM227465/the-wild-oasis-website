'use client';

import { type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  children: ReactNode;
  pendingLabel: string;
  isDisable?: boolean;
}

const SubmitButton = (props: Props) => {
  const { children, pendingLabel, isDisable = false } = props;
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || isDisable}
      className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
