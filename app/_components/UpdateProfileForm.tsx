'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';
import SubmitButton from './SubmitButton';
import { IGuest } from '../_interfaces/guest';
import { updateGuestProfile } from '../_lib/actions';

interface Props {
  children: ReactNode;
  guest: IGuest;
}

const UpdateProfileForm = (props: Props) => {
  const { children, guest } = props;
  const { fullName, email, countryFlag, nationalId } = guest;

  return (
    <form
      className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
      action={updateGuestProfile}
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          disabled
          name='fullName'
          defaultValue={fullName}
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          disabled
          name='email'
          defaultValue={email}
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label>Where are you from?</label>
          <Image
            src={countryFlag}
            alt='Country flag'
            className='h-5 rounded-sm'
            width={20}
            height={20}
          />
        </div>

        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalId'>National ID number</label>
        <input
          name='nationalId'
          defaultValue={nationalId}
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
        />
      </div>

      <div className='flex justify-end items-center gap-6'>
        <SubmitButton pendingLabel='Updating...'>Update profile</SubmitButton>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
