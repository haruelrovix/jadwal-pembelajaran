export interface Teacher {
  Id: string;
  firstName: string;
  lastName: string;
  name: string;
  short: string;
  gender: 'M' | 'F';
  color: string;
  email: string;
  mobile: string;
  partnerId: string;
}

export interface ApiResponse {
  teacher: Teacher[];
}