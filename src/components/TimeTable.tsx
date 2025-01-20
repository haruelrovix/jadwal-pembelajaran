import { useState, useMemo } from 'react';
import { SearchableDropdown } from './SearchableDropdown';
import { ViewType, MOCK_TEACHERS, MOCK_CLASSES, MOCK_SCHEDULES } from '../types';
import { BookOpen } from 'lucide-react';

const PERIODS = Array.from({ length: 8 }, (_, i) => `Jam ke-${i}`);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function TimeTable() {
  const [viewType, setViewType] = useState<ViewType>('teacher');
  const [selectedId, setSelectedId] = useState('');

  const filteredSchedules = useMemo(() => {
    if (!selectedId) return [];
    return MOCK_SCHEDULES.filter(schedule =>
      viewType === 'teacher'
        ? schedule.teacherIds === selectedId
        : schedule.classIds === selectedId
    );
  }, [selectedId, viewType]);

  const getScheduleForCell = (period: string, day: string) => {
    // In a real app, you would use actual day/period mapping logic
    // This is a simplified example
    const periodIndex = parseInt(period.split('-')[1]);
    const dayIndex = DAYS.indexOf(day);

    return filteredSchedules.find((_, index) =>
      index % PERIODS.length === periodIndex &&
      Math.floor(index / PERIODS.length) === dayIndex
    );
  };

  const getTeacherOrClassName = (schedule: typeof MOCK_SCHEDULES[0]) => {
    if (viewType === 'teacher') {
      const classInfo = MOCK_CLASSES.find(c => c.id === schedule.classIds);
      return classInfo?.name || 'Unknown Class';
    } else {
      const teacherInfo = MOCK_TEACHERS.find(t => t.id === schedule.teacherIds);
      return teacherInfo?.name || 'Unknown Teacher';
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
              checked={viewType === 'teacher'}
              onChange={() => {
                setViewType('teacher');
                setSelectedId('');
              }}
            />
            <span className="ml-2">By Teacher</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-blue-600"
              checked={viewType === 'class'}
              onChange={() => {
                setViewType('class');
                setSelectedId('');
              }}
            />
            <span className="ml-2">By Class</span>
          </label>
          <div className="w-64">
            <SearchableDropdown
              options={viewType === 'teacher' ? MOCK_TEACHERS : MOCK_CLASSES}
              value={selectedId}
              onChange={setSelectedId}
              placeholder={`Select ${viewType === 'teacher' ? 'a teacher' : 'a class'}...`}
            />
          </div>
        </div>
      </div>

      {selectedId && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">Time</th>
                {DAYS.map(day => (
                  <th key={day} className="border p-3 text-left">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => (
                <tr key={period}>
                  <td className="border p-3 font-medium bg-gray-50">{period}</td>
                  {DAYS.map(day => {
                    const schedule = getScheduleForCell(period, day);
                    return (
                      <td key={`${period}-${day}`} className="border p-3">
                        {schedule ? (
                          <div className="min-h-[60px] p-2 bg-blue-50 rounded-md border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-700">
                              <BookOpen className="w-4 h-4" />
                              <span className="font-medium">
                                {getTeacherOrClassName(schedule)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Room: {schedule.classRoomIds}
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
      )}
    </div>
  );
}
