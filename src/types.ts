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
