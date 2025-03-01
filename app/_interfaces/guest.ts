export interface IGuest {
  id: number;
  created_at: string; // ISO date string
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalId: string;
}
