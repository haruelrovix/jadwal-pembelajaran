export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  short: string;
  gender: 'M' | 'F';
  color: string;
  email?: string;
  mobile?: string;
  partnerId?: string;
}

export interface Course {
  id: string;
  short: string;
  name: string;
  partnerId?: string;
}

export interface ApiResponse {
  teachers: Teacher[];
  subjects: Course[];
}
