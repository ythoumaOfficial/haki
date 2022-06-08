export interface IUsers {
  id: number;
  full_name: string;
  birth_date: Date;
  gender: number;
  religion: number;
  email: string;
  country: number;
  city: string;
  geo: string;
  otp: string;
  active: boolean;
  phone: string;
  password: string;
  fcm_token: string;
  group: string;
  // group: string;
  // group: string;

  actions?: string;
}
