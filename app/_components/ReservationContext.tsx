'use client';

import {
  createContext,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from 'react';
import { type DateRange } from 'react-day-picker';

interface IRangeProviderContextType {
  range: DateRange | undefined;
  setRange: React.Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}

const ReservationContext = createContext<IRangeProviderContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

const ReservationProvider = (props: Props) => {
  const { children } = props;
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const resetRange = () => setRange(undefined);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }

  return context;
};

export { ReservationProvider, useReservation };
