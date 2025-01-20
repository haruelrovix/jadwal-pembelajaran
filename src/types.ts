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

export interface ClassRoom {
  id: string;
  name: string;
  short: string;
  capacity: string;
  buildingId: string;
  partnerId?: string;
}

export interface Schedule {
  id: string;
  classIds: string;
  subjectId: string;
  periodsPerCard: string;
  periodsPerWeek: string;
  teacherIds: string;
  classRoomIds: string;
  groupIds: string;
  capacity: string;
  seminarGroup: string;
  termsDefId: string;
  weeksDefId: string;
  daysDefId: string;
  partnerId: string;
}

export interface ApiResponse {
  teachers: Teacher[];
  subjects: Course[];
  classRooms: ClassRoom[];
  schedules?: Schedule[];
}

export type ViewType = 'teacher' | 'class';

// Mock data - replace with actual data from your backend
export const MOCK_TEACHERS = [
  { id: 'F664B6EA513D6355', name: 'John Smith' },
  { id: '2', name: 'Jane Doe' },
  { id: '3', name: 'Robert Johnson' },
];

export const MOCK_CLASSES = [
  { id: 'AA46C779B0D4FABE', name: 'Class 10A' },
  { id: '2', name: 'Class 10B' },
  { id: '3', name: 'Class 11A' },
];

export const MOCK_SCHEDULES = [
  {
    id: '749CD18A5B7FDDD1',
    classIds: 'AA46C779B0D4FABE',
    subjectId: '6C09535674D94EFB',
    periodsPerCard: '2',
    periodsPerWeek: '2.0',
    teacherIds: 'F664B6EA513D6355',
    classRoomIds: '2192A59BBB253475',
    groupIds: '661E54295F4C04AB',
    capacity: '*',
    seminarGroup: '',
    termsDefId: 'DDC24C85969FCC2E',
    weeksDefId: 'BA31F1823DE5FC71',
    daysDefId: '198240E21E8B0ECE',
    partnerId: ''
  },
  {
    id: '2',
    classIds: 'AA46C779B0D4FABE',
    subjectId: '2',
    periodsPerCard: '1',
    periodsPerWeek: '1.0',
    teacherIds: '2',
    classRoomIds: '2',
    groupIds: '2',
    capacity: '*',
    seminarGroup: '',
    termsDefId: '2',
    weeksDefId: '2',
    daysDefId: '2',
    partnerId: ''
  },
  {
    id: '3',
    classIds: '2',
    subjectId: '3',
    periodsPerCard: '2',
    periodsPerWeek: '2.0',
    teacherIds: '3',
    classRoomIds: '3',
    groupIds: '3',
    capacity: '*',
    seminarGroup: '',
    termsDefId: '3',
    weeksDefId: '3',
    daysDefId: '3',
    partnerId: ''
  }
];
