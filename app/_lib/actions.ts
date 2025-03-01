'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import supabase from './supabase';

export const signInAction = async () => {
  await signIn('google', { redirectTo: '/account' });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: '/' });
};

export const updateGuestProfile = async (formData: FormData) => {
  const session = await auth();

  if (!session) {
    throw new Error('You must be logged in!');
  }

  const nationalId = formData.get('nationalId');
  const nationalityValue = formData.get('nationality');

  if (!nationalId || typeof nationalId !== 'string') {
    throw new Error('National ID is required');
  }

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId)) {
    throw new Error('Please provide a valid national ID (6-12 alphanumeric characters)');
  }

  let nationality = '';
  let countryFlag = '';

  if (nationalityValue && typeof nationalityValue === 'string') {
    const parts = nationalityValue.split('%');
    nationality = parts[0] || '';
    countryFlag = parts[1] || '';
  } else {
    throw new Error('Nationality information is required');
  }

  const payload = { nationality, countryFlag, nationalId };

  const { data, error } = await supabase
    .from('guests')
    .update(payload)
    .eq('id', session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile');
};
