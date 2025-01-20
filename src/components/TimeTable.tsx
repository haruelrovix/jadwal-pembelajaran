import { useState } from 'react';
import { SearchableDropdown } from './SearchableDropdown';
import { ViewType, Teacher, ClassRoom, Schedule, Course, Period, Card } from '../types';
import { BookOpen } from 'lucide-react';

const CARD_DAYS = {
  '10000': 'Mon',
  '01000': 'Tue',
  '00100': 'Wed',
  '00010': 'Thu',
  '00001': 'Fri',
};
const DAYS = Object.keys(CARD_DAYS);

interface TimeTableProps {
  teachers: Teacher[];
  classrooms: ClassRoom[];
  schedules: Schedule[];
  subjects: Course[];
  periods: Period[];
  cards: Card[];
}

export function TimeTable({ teachers, classrooms, schedules, subjects, periods, cards }: Readonly<TimeTableProps>) {
  const [viewType, setViewType] = useState<ViewType>(ViewType.None);
  const [selectedId, setSelectedId] = useState('');

  const getScheduleForCell = (card: Card | undefined): Schedule | null | undefined => {
    if (!card) {
      return null;
    }

    if (viewType === ViewType.Teacher && selectedId) {
      const filtered = schedules.filter(s => s.teacherIds === selectedId);
      return filtered.find(s => s.id === card.lessonId);
    }

    return schedules.find(s => s.id === card.lessonId);
  };

  const getCard = (day: string, period: Period): Card | undefined => {
    if (viewType === ViewType.Class && selectedId) {
      const filtered = cards.filter(c => c.classroomIds === selectedId);
      return filtered.find(c => c.days === day && c.period === period.name);
    }

    return cards.find(c => c.days === day && c.period === period.name);
  };

  const getTeacherName = (schedule: Schedule | null | undefined): string => {
    if (!schedule) {
      return '';
    }

    const teacherIds = schedule.teacherIds.split(',');
    const teacherInfo = teachers.find(t => teacherIds.includes(t.id));

    return teacherInfo?.name ?? 'Unknown Teacher';
  };

  const getCourseSubject = (id: string): string => {
    const subject = subjects.find(s => s.id === id);
    return subject?.name ?? 'Unknown Subject';
  }

  const getClassRoomName = (id: string): string => {
    const classInfo = classrooms.find(c => c.id === id);
    return classInfo?.name ?? 'Unknown Class';
  };
  
  const getTeacherColor = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    const color = teacher?.color ?? '';
    
    // If color is empty, return transparent
    if (!color) return 'transparent';
    
    // If color doesn't start with #, return as is
    if (!color.startsWith('#')) return color;
    
    // Add 20% opacity (alpha) to the hex color
    return `${color}33`;
  };

  const getPlaceholder = (viewType: ViewType): string => {
    switch (viewType) {
      case ViewType.Teacher:
        return 'Select a teacher...';
      case ViewType.Class:
        return 'Select a class...';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={viewType === ViewType.None}
              onChange={() => {
                setViewType(ViewType.None);
                setSelectedId('');
              }}
            />
            <span className="ml-2">None</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={viewType === ViewType.Teacher}
              onChange={() => {
                setViewType(ViewType.Teacher);
                setSelectedId('');
              }}
            />
            <span className="ml-2">By Teacher</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={viewType === ViewType.Class}
              onChange={() => {
                setViewType(ViewType.Class);
                setSelectedId('');
              }}
            />
            <span className="ml-2">By Class</span>
          </label>
          <div className="w-64">
            <SearchableDropdown
              options={viewType === ViewType.Teacher ? teachers : classrooms}
              value={selectedId}
              onChange={setSelectedId}
              placeholder={getPlaceholder(viewType)}
              disabled={viewType === ViewType.None}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-3 text-left w-20">Time</th>
              {DAYS.map(day => (
                <th key={day} className="border p-3 text-left">{CARD_DAYS[day as keyof typeof CARD_DAYS]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period.name}>
                <td className="border p-3 font-medium bg-gray-50">{period.startTime} - {period.endTime}</td>
                {DAYS.map(day => {
                  if (!cards) {
                    return null;
                  }

                  const card = getCard(day, period);
                  const schedule = getScheduleForCell(card);

                  const style = { backgroundColor: getTeacherColor(schedule?.teacherIds ?? '') };

                  return (
                    <td key={`${period.name}-${day}`} className="border p-3">
                      {schedule ? (
                        <div className="min-h-[60px] p-2 bg-blue-50 rounded-md border border-blue-100" style={style}>
                          <div className="flex items-center gap-2 text-blue-700">
                            <BookOpen className="w-4 h-4" />
                            <span className="font-medium">
                              {getCourseSubject(schedule.subjectId)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {getTeacherName(schedule)}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {getClassRoomName(schedule.classRoomIds)}
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-[60px]" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
